let Cat = require("../models/categorySchema");
let subcat = require("../models/subcategoryschema");

let craetecategory = async (req, res) => {
    let {name,owner} = req.body;

    let exist = await Cat.findOne({name:name});
    if(exist){
        return res.status(400).json({
            success: false,
            message : `category already exist`
        });
    }

    let cat = new Cat({
        name : name.toLowerCase(),
        owner:owner
    })

    await cat.save();

    res.status(201).json({
        success: true,
        message : `category created`,
    });
}

let getallcategory = async (req, res) => {
    let data = await Cat.find({}).populate({
        path: 'owner',
        select: '-password'
    });

    res.status(200).json({
        success: true,
        data: data
    });
}


const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        const category = await Cat.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        const existingCategory = await Cat.findOne({
            name: name,
            _id: { $ne: id }
        });

        if (existingCategory) {
            return res.status(400).json({
                message: "Category already exists"
            });
        }

        category.name = name;

        await category.save();

        res.status(200).json({
            message: "Category updated successfully",
            category
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Cat.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        await Cat.findByIdAndDelete(id);

        res.status(200).json({
            message: "Category deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const craetesubcategory = async (req, res) => {
    let { name, parentcategory } = req.body;

    let exist = await subcat.findOne({ name: name });

    if (exist) {
        return res.status(400).json({
            success: false,
            message: `subcategory already exist`
        });
    }

    let subcategory = new subcat({
        name: name.toLowerCase(),
        parentcategory: parentcategory
    });

    let catupdate = await Cat.findByIdAndUpdate({_id:parentcategory},{ $push: { subcategories: subcategory._id } });

    await subcategory.save();

    res.status(201).json({
        success: true,
        message: `subcategory created`,
    });
};

let getallsubcategory = async (req, res) => {
    let data = await subcat.find({}).populate("parentcategory");

    res.status(200).json({
        success: true,
        data: data
    });
}

let getallcategorywisesubcategory = async (req, res) => {
    let{id} = req.params;
    let data = await subcat.find({parentcategory:id})

    res.status(200).json({
        success: true,
        data: data
    });
}

let getallownerwisecategory = async (req,res) =>{
    let {id} = req.params
    let data = await Cat.find({owner:id}).populate('subcategories');

    // let cat = []

    // console.log(data);
    // data.map(async(item)=>{
    //     let subcategories = await subcat.find({parentcategory:item._id});
        
    //     let data = {
    //         ...item,
    //         subcategories:subcategories
    //     }

    //     cat.push(data)
    // });

    res.status(200).json({
        success: true,
        data: data
    });
}

module.exports = {craetecategory, getallcategory, updateCategory, deleteCategory, craetesubcategory, getallsubcategory,getallcategorywisesubcategory,getallownerwisecategory};