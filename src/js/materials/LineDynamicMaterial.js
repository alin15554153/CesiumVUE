
function LineDynamicMaterial(color, duration) {
  this._definitionChanged = new Cesium.Event();
  this._color = undefined;
  this.color = color;
  this.duration = duration;
  this._time = (new Date()).getTime();
}
Cesium.defineProperties(LineDynamicMaterial.prototype, {
  isConstant: {
    get: function () {
      return false;
    }
  },
  definitionChanged: {
    get: function () {
      return this._definitionChanged;
    }
  },
  color: Cesium.createPropertyDescriptor('color')
});
LineDynamicMaterial.prototype.getType = function (time) {
  return 'LineDynamicMaterial';
}
LineDynamicMaterial.prototype.getValue = function (time, result) {
  if (!Cesium.defined(result)) {
    result = {};
  }
  result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
  result.image = Cesium.Material.LineDynamicMaterialImage;
  result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
  return result;
}
LineDynamicMaterial.prototype.equals = function (other) {
  return this === other ||
    (other instanceof LineDynamicMaterial &&
      Property.equals(this._color, other._color))
}
Cesium.LineDynamicMaterial = LineDynamicMaterial;
Cesium.Material.LineDynamicMaterial = 'LineDynamicMaterial';
Cesium.Material.LineDynamicMaterialImage = require("../../assets/images/FreshWind.png");
Cesium.Material.LineDynamicMaterialSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                      {\n\
                                                           czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                           vec2 st = materialInput.st;\n\
                                                           vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                                                           material.alpha = colorImage.a;\n\
                                                           material.diffuse = colorImage.rgb;\n\
                                                           return material;\n\
                                                       }";
Cesium.Material._materialCache.addMaterial(Cesium.Material.LineDynamicMaterial, {
  fabric: {
    type: Cesium.Material.LineDynamicMaterial,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
      image: Cesium.Material.LineDynamicMaterialImage,
      time: 0
    },
    source: Cesium.Material.LineDynamicMaterialSource
  },
  translucent: function (material) {
    return true;
  }
});

export default   LineDynamicMaterial;
