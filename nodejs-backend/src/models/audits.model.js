
    module.exports = function (app) {
        const modelName = "audits";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            serviceNames: { type:  String , required: true, comment: "Service Names, p, false, true, true, true, true, true, true, , , , ," },
action: { type:  String , required: true, comment: "Action, p, false, true, true, true, true, true, true, , , , ," },
details: { type:  String , required: true, comment: "Details, p, false, true, true, true, true, true, true, , , , ," },
createdBy: { type:  String , maxLength: 150, index: true, trim: true, comment: "Created By, p, false, true, true, true, true, true, true, , , , ," },
updatedBy: { type:  String , required: true, comment: "Updated By, p, false, true, true, true, true, true, true, , , , ," },
method: { type:  String , required: true, comment: "Method, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };