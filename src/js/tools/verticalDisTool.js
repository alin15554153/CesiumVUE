import BaseTool from './baseTool'

function VertivalDisTool(viewer, onCreate) {
  BaseTool.call(this, viewer);
  this._onCreate = onCreate;
  this._points = {};
  this._polyline = null;
  this._positions = [];
  this._label = null;

  var _that = this;
  this._drawHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

  this._drawHandler.setInputAction(function (event) {
    var cartesian = _that.pick(event.position);
    if (!Cesium.defined(cartesian)) {
      return;
    }
    if (_that._positions.length == 0){
      _that._positions.push(cartesian);
      _that._positions.push(cartesian);
      _that.createPolyline();
      _that.createPoint();
      _that.createLabel();
    }
    else{
      _that._points = {};
      _that._polyline = null;
      _that._label = null;
      _that.endCreate();
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  this._drawHandler.setInputAction(function (event) {
    if (_that._positions.length < 2) return;
    var cartesian = _that.pick(event.endPosition);
    if (!Cesium.defined(cartesian)) {
      return;
    }

    _that._positions.pop();
    _that._positions.push(cartesian);

    if (!Cesium.defined(_that._label)) {
      return;
    }

    _that._label._label.text = _that.getTips();
    _that._label.position.setValue(cartesian);
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  this._drawHandler.setInputAction(function (event) {
      _that.clear();
  }, Cesium.ScreenSpaceEventType.RIGHT_UP);
}

VertivalDisTool.prototype = new BaseTool();
VertivalDisTool.prototype.endCreate = function () {
  var _that = this;
  if (_that._drawHandler) {
    _that._drawHandler.destroy();
    _that._drawHandler = null;
  }

  _that._polyline = null;
  _that._points = {};
  _that._labels = null;
  /*if (_that._entity){
      _that._viewer.entities.remove(_that._entity);
      _that._entity = null;
  }

  if (_that._billboards) {
      _that._viewer.scene.primitives.remove(_that._billboards);
      //_that._billboards.destroy();
      _that._billboards = null;
  }

  /*if (_that._tip)           _that._tip.destroy();
      _that._tip = null;
  }*/
};

VertivalDisTool.prototype.clear = function () {
  var _that = this;
  if (_that._drawHandler) {
    _that._drawHandler.destroy();
    _that._drawHandler = null;
  }

  if (_that._polyline){
    _that._viewer.entities.remove(_that._polyline);
    _that._polyline = null;
  }

  if (_that._label){
    _that._viewer.entities.remove(_that._label);
    _that._label = null;
  }

  if (_that._points[0]){
    _that._viewer.entities.remove(_that._points[0]);
    _that._points[0] = null;
  }

  if (_that._points[1]){
    _that._viewer.entities.remove(_that._points[1]);
    _that._points[1] = null;
  }

  if (_that._points[2]){
    _that._viewer.entities.remove(_that._points[2]);
    _that._points[2] = null;
  }
  _that._points = {};
};

VertivalDisTool.prototype.createPolyline = function () {
  var _that = this;

  var callbackPositions = new Cesium.CallbackProperty(function () {
    if (_that._positions.length < 2) return null;
      var _PolylinePos = [];
      _PolylinePos.push(_that._positions[0]);
      _PolylinePos.push(_that._positions[1]);
      var longlaal0 = _that._viewer.scene.globe.ellipsoid.cartesianToCartographic(_that._positions[0]);
      var longlaal1 = _that._viewer.scene.globe.ellipsoid.cartesianToCartographic(_that._positions[1]);
      if (longlaal0.height < longlaal1.height)
          _PolylinePos.push(Cesium.Cartesian3.fromRadians(longlaal1.longitude, longlaal1.latitude, longlaal0.height, _that._viewer.scene.globe.ellipsoid));
      else
          _PolylinePos.push(Cesium.Cartesian3.fromRadians(longlaal0.longitude, longlaal0.latitude, longlaal1.height, _that._viewer.scene.globe.ellipsoid));
      _PolylinePos.push(_that._positions[0]);
      return _PolylinePos;
  }, false);

  _that._polyline = _that._viewer.entities.add({
    layerId: 'Measure',
      polyline: {
        positions: callbackPositions,
        clampToGround: false,
        width: 4,
        show:true,
        material : Cesium.Color.GREEN,
      }
  });
}
VertivalDisTool.prototype.createPoint = function () {
    var _that = this;

    if (_that._positions.length < 2)   return;

    _that._points[0] = _that._viewer.entities.add({
        layerId: 'Measure',
        position: _that._positions[0],
        billboard: {
            image: require('../../assets/images/drag.png'),
            //eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0, 0, -500)),
            heightReference: Cesium.HeightReference.NONE
        }
    });

    _that._points[1] = _that._viewer.entities.add({
        layerId: 'Measure',
        position: _that._positions[1],
        billboard: {
          image: require('../../assets/images/drag.png'),
          //eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0, 0, -500)),
          heightReference: Cesium.HeightReference.NONE
        }
    });

  var callbackPosition = new Cesium.CallbackProperty(function () {
    if (_that._positions.length < 2)   return null;
    var longlaal0 = _that._viewer.scene.globe.ellipsoid.cartesianToCartographic(_that._positions[0]);
    var longlaal1 = _that._viewer.scene.globe.ellipsoid.cartesianToCartographic(_that._positions[1]);
    if (longlaal0.height < longlaal1.height)
      return Cesium.Cartesian3.fromRadians(longlaal1.longitude, longlaal1.latitude, longlaal0.height, _that._viewer.scene.globe.ellipsoid);
    else
      return Cesium.Cartesian3.fromRadians(longlaal0.longitude, longlaal0.latitude, longlaal1.height, _that._viewer.scene.globe.ellipsoid);
  }, false);


  _that._points[2] = _that._viewer.entities.add({
    layerId: 'Measure',
    position: callbackPosition,
    billboard: {
      image: require('../../assets/images/drag.png'),
      //eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0, 0, -500)),
      heightReference: Cesium.HeightReference.NONE
    }
  });
}

VertivalDisTool.prototype.createLabel = function () {
  var _that = this;

  if (_that._positions.length < 2)   return;

  _that._label = _that._viewer.entities.add({
    layerId: 'Measure',
    position: _that._positions[_that._positions.length - 1],
    label : {
      text : _that.getTips(),
      font : '10px sans-serif',
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      fillColor : Cesium.Color.WHITE,
      outlineColor : Cesium.Color.BLACK,
      outLineWidth : 1.0,
      show : true,
      showBackground :true,
      backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
      backgroundPadding:new Cesium.Cartesian2(7, 5),
      scale:1.0,
      horizontalOrigin : Cesium.HorizontalOrigin.BOTTON,
      verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
      eyeOffset : Cesium.Cartesian3.ZERO,
      pixelOffset : new Cesium.Cartesian2(0, -10),
      //translucencyByDistance,
      //pixelOffsetScaleByDistance,
      //scaleByDistance,
      heightReference : Cesium.HeightReference.NONE,
      //distanceDisplayCondition : new Cesium.DistanceDisplayCondition(0.0, 20000.0)
    }
  });
}

VertivalDisTool.prototype.getTips = function (){
  var Distance = {
    vertical:0.0,
    horizontal:0.0,
    spatial:0.0
  }
  if (this._positions.length < 2)  return '';

 /* var _mRadius = 6378137;
  var longlaal0 = this._viewer.scene.globe.ellipsoid.cartesianToCartographic(this._positions[0]);
  var longlaal1 = this._viewer.scene.globe.ellipsoid.cartesianToCartographic(this._positions[1]);

  Distance.vertical = _mRadius * Math.acos(Math.sin(longlaal0.latitude) * Math.sin(longlaal1.latitude) +
      Math.cos(longlaal0.latitude) * Math.cos(longlaal1.latitude) * Math.cos(longlaal1.longitude - longlaal0.longitude));

  Distance.spatial = Cesium.Cartesian3.distance(this._positions[0], this._positions[1]);*/
  var startcartographic = Cesium.Cartographic.fromCartesian(this._positions[0]);
  var endcartographic = Cesium.Cartographic.fromCartesian(this._positions[1]);
  /**根据经纬度计算出距离**/
  var geodesic = new Cesium.EllipsoidGeodesic();
  geodesic.setEndPoints(startcartographic, endcartographic);
  Distance.horizontal = geodesic.surfaceDistance;
  Distance.spatial = Math.sqrt(Math.pow(Distance.horizontal, 2) + Math.pow(endcartographic.height - startcartographic.height, 2));
  Distance.vertical = Math.abs(startcartographic.height - endcartographic.height)

  return '水平距离：' + (Distance.horizontal < 1000 ? Distance.horizontal.toFixed(3) + '米' :
    (Distance.horizontal / 1000.0 ).toFixed(6) + '千米')
  + '\n垂直距离：' + (Distance.vertical < 1000 ? Distance.vertical.toFixed(3) + '米' :
    (Distance.vertical / 1000.0 ).toFixed(6) + '千米')
  + '\n空间距离：' + (Distance.spatial < 1000 ? Distance.spatial.toFixed(3) + '米' :
    (Distance.spatial / 1000.0 ).toFixed(6) + '千米');
}

export default  VertivalDisTool;
