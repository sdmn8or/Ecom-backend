let Cat = require("../models/categorySchema");

let usercontroller = (req, res) => {
    res.send("usercontroller");
}


let craetecategory = async (req, res) => {
    let {name} = req.body;

    let exist = await Cat.findOne({name:name});
    if(exist){
        return res.status(400).json({
            success: false,
            message : `category already exist`
        });
    }

    let cat = new Cat({
        name : name.tolowerCase()
    })

    await cat.save();

    res.status(201).json({
        success: true,
        message : `category created`,
    });
}

let getallcategory = async (req, res) => {
    let data = await Cat.find({});

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



module.exports = {usercontroller, craetecategory, getallcategory, updateCategory, deleteCategory};