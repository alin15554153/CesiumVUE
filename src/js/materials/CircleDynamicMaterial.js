
function CircleDynamicMaterial(color, duration, count) {
  this._definitionChanged = new Cesium.Event();
  this._color = undefined;
  this.color = color;
  this.duration = duration;
  this._time = (new Date()).getTime();
  this.count = Cesium.defaultValue(count, 3);
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
  result.count = this.count;
  return result;
}
CircleDynamicMaterial.prototype.equals = function (other) {
  return this === other ||
    (other instanceof CircleDynamicMaterial &&
      Cesium.Property.equals(this._color, other._color))
}
Cesium.CircleDynamicMaterial = CircleDynamicMaterial;
Cesium.Material.CircleDynamicMaterial = 'CircleDynamicMaterial';
Cesium.Material.CircleDynamicMaterialImage = require("../../assets/images/concentric.png");
Cesium.Material.CircleDynamicMaterialSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                      {\n\
                                                           czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                           vec2 st = materialInput.st;\n\
                                                           float step = 1.0 / float(count+1.0);\n\
                                                           for(int i = 0; i < int(10); i++)\n\
                                                           {\n\
                                                              if(i >= int(count+1.0)) continue;\n\
                                                              vec2 stTem = st;\n\
                                                              if(st.s > 0.5)\n\
                                                                  stTem.s = st.s + 0.5 - 0.5 * (time + float(i)) * step;\n\
                                                              else\n\
                                                                  stTem.s = st.s - 0.5 + 0.5 * (time + float(i)) * step;\n\
                                                              if(st.t > 0.5)\n\
                                                                  stTem.t = st.t + 0.5 - 0.5 * (time + float(i)) * step;\n\
                                                              else\n\
                                                                  stTem.t = st.t - 0.5 + 0.5 * (time + float(i)) * step;\n\
                                                              vec4 colorImage = texture2D(image, stTem);\n\
                                                              if(i == 0)\n\
                                                              {\n\
                                                                material.alpha = colorImage.a;\n\
                                                                material.diffuse = colorImage.rgb;\n\
                                                              }\n\
                                                              else{\n\
                                                                material.alpha = max(colorImage.a, material.alpha);\n\
                                                                material.diffuse = color.rgb;\n\
                                                              }\n\
                                                           }\n\
                                                           return material;\n\
                                                       }";
Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleDynamicMaterial, {
  fabric: {
    type: Cesium.Material.CircleDynamicMaterial,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
      image: Cesium.Material.CircleDynamicMaterialImage,
      count:0,
      time: 0
    },
    source: Cesium.Material.CircleDynamicMaterialSource
  },
  translucent: function (material) {
    return true;
  }
});

export default   CircleDynamicMaterial;
