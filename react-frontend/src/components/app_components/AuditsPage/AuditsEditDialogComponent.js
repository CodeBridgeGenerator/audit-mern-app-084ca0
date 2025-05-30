import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const AuditsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            serviceNames: _entity?.serviceNames,
action: _entity?.action,
details: _entity?.details,
createdBy: _entity?.createdBy,
updatedBy: _entity?.updatedBy,
method: _entity?.method,
        };

        setLoading(true);
        try {
            
        const result = await client.service("audits").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info audits updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Edit Audits" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="audits-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="serviceNames">Service Names:</label>
                <InputText id="serviceNames" className="w-full mb-3 p-inputtext-sm" value={_entity?.serviceNames} onChange={(e) => setValByKey("serviceNames", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["serviceNames"]) && (
              <p className="m-0" key="error-serviceNames">
                {error["serviceNames"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="action">Action:</label>
                <InputText id="action" className="w-full mb-3 p-inputtext-sm" value={_entity?.action} onChange={(e) => setValByKey("action", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["action"]) && (
              <p className="m-0" key="error-action">
                {error["action"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="details">Details:</label>
                <InputText id="details" className="w-full mb-3 p-inputtext-sm" value={_entity?.details} onChange={(e) => setValByKey("details", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["details"]) && (
              <p className="m-0" key="error-details">
                {error["details"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="createdBy">Created By:</label>
                <InputText id="createdBy" className="w-full mb-3 p-inputtext-sm" value={_entity?.createdBy} onChange={(e) => setValByKey("createdBy", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["createdBy"]) && (
              <p className="m-0" key="error-createdBy">
                {error["createdBy"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="updatedBy">Updated By:</label>
                <InputText id="updatedBy" className="w-full mb-3 p-inputtext-sm" value={_entity?.updatedBy} onChange={(e) => setValByKey("updatedBy", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["updatedBy"]) && (
              <p className="m-0" key="error-updatedBy">
                {error["updatedBy"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="method">Method:</label>
                <InputText id="method" className="w-full mb-3 p-inputtext-sm" value={_entity?.method} onChange={(e) => setValByKey("method", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["method"]) && (
              <p className="m-0" key="error-method">
                {error["method"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(AuditsCreateDialogComponent);
