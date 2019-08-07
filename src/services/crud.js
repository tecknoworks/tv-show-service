module.exports = function (Model) {
    return {
        getAll: async function () {
            let resultList = await Model.find()
            return resultList.map(doc => doc.toObject())
        },
        getById: async function (id) {
            let result = await Model.findById(id);
            return result.toObject();
        },
        insert: async function (ModelMap) {
            ModelMap.createdAt=new Date()
            let result = await Model.create(ModelMap)
            return result.toObject()
        },
        delete: async function (id) {
            let result = await Model.findByIdAndDelete(id)
            return result.toObject()
        }
    }
}