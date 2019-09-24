
function CircleDynamicMaterial(color, duration) {
  this._definitionChanged = new Cesium.Event();
  this._color = undefined;
  this.color = color;
  this.duration = duration;
  this._time = (new Date()).getTime();
}
Cesium.defineProperties(CircleDynamicMaterial.prototype, {
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
CircleDynamicMaterial.prototype.getType = function (time) {
  return 'CircleDynamicMaterial';
}
CircleDynamicMaterial.prototype.getValue = function (time, result) {
  if (!Cesium.defined(result)) {
    result = {};
  }
  result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
  result.image = Cesium.Material.CircleDynamicMaterialImage;
  result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
  return result;
}
CircleDynamicMaterial.prototype.equals = function (other) {
  return this === other ||
    (other instanceof CircleDynamicMaterial &&
      Property.equals(this._color, other._color))
}
Cesium.CircleDynamicMaterial = CircleDynamicMaterial;
Cesium.Material.CircleDynamicMaterial = 'CircleDynamicMaterial';
Cesium.Material.CircleDynamicMaterialImage = require("../../assets/images/concentric.png");
Cesium.Material.CircleDynamicMaterialSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                      {\n\
                                                           czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                           vec2 st = materialInput.st;\n\
                                                           vec2 stTem = st;\n\
                                                           if(st.s > 0.5)\n\
                                                              stTem.s = 0.5 + (st.s - 0.5) * float(1.0 - time);\n\
                                                           else\n\
                                                              stTem.s = 0.5 - (-st.s + 0.5) * float(1.0 - time);\n\
                                                           if(st.t > 0.5)\n\
                                                              stTem.t = 0.5 + (st.t - 0.5) * float(1.0 - time);\n\
                                                           else\n\
                                                              stTem.t = 0.5 - (-st.t + 0.5) * float(1.0 - time);\n\
                                                           vec4 colorImage = texture2D(image, stTem);\n\
                                                           material.alpha = colorImage.a;\n\
                                                           material.diffuse = colorImage.rgb;\n\
                                                           return material;\n\
                                                       }";
Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleDynamicMaterial, {
  fabric: {
    type: Cesium.Material.CircleDynamicMaterial,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
      image: Cesium.Material.CircleDynamicMaterialImage,
      time: 0
    },
    source: Cesium.Material.CircleDynamicMaterialSource
  },
  translucent: function (material) {
    return true;
  }
});

export default   CircleDynamicMaterial;
