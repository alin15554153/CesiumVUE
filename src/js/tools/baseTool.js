function BaseTool(viewer){
        this._viewer = viewer;
    }

//BaseTool.prototype.constructor = BaseTool;
BaseTool.prototype.pick = function (screenPoint) {
    if (!Cesium.defined(screenPoint)) {
        return;
    }

    var pickedObject = this._viewer.scene.pick(screenPoint);
    if (this._viewer.scene.mode !== Cesium.SceneMode.MORPHING &&
        this._viewer.scene.pickPositionSupported && Cesium.defined(pickedObject) && pickedObject.id &&
      (!Cesium.defined(pickedObject.id.layerId) || pickedObject.id.layerId != 'Measure')) {
        return this._viewer.scene.pickPosition(screenPoint);
    }
    else{
        var ray = this._viewer.camera.getPickRay(screenPoint);
        if (!Cesium.defined(ray)) {
            return null;
        }
        var cartesian = this._viewer.scene.globe.pick(ray, this._viewer.scene);

        return cartesian;

        //return this._viewer.camera.pickEllipsoid(screenPoint, this._viewer.scene.globe.ellipsoid);
    }
}

export default  BaseTool;
