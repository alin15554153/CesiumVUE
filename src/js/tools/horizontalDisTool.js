import BaseTool from './baseTool'

function HorizontalDisTool(viewer, onCreate) {
        BaseTool.call(this, viewer);
        this._onCreate = onCreate;
        this._points = {};
        this._polyline = null;
        this._positions = [];
        this._labels = {};

        var _that = this;
        this._drawHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

        this._drawHandler.setInputAction(function (event) {
            var cartesian = _that.pick(event.position);
            if (!Cesium.defined(cartesian)) {
                return;
            }
            if (_that._positions.length == 0){
                _that._positions.push(cartesian);
                _that.createPolyline();
                _that.createPoint(0);
            }
            _that._positions.push(cartesian);
            _that.createPoint(_that._positions.length - 1);
          _that.createLabel(_that._positions.length - 1);

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        this._drawHandler.setInputAction(function (event) {
            if (_that._positions.length < 1) return;
            var cartesian = _that.pick(event.endPosition);
            if (!Cesium.defined(cartesian)) {
                return;
            }

            _that._positions.pop();
            _that._positions.push(cartesian);
            if (_that._positions.length > 0){
                _that._points[_that._positions.length - 1].position = cartesian;
                _that._labels[_that._positions.length - 1].position = cartesian;
                var _mDistance = _that.getDistance();
                _that._labels[_that._positions.length - 1]._label.text = _mDistance < 1000 ? _mDistance.toFixed(3)+ '米' :
                  ( _mDistance  / 1000.0 ).toFixed(6) + '千米';
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        this._drawHandler.setInputAction(function (event) {
            //_that._onCreate(_that._positions);
          if(_that._positions.length > 0){
              _that._viewer.entities.remove(_that._points[_that._positions.length - 1]);
              _that._points[_that._positions.length - 1] = null;
              _that._viewer.entities.remove(_that._labels[_that._positions.length - 1]);
              _that._labels[_that._positions.length - 1] = null;
              _that._positions.pop();
          }

            _that.endCreate();
        }, Cesium.ScreenSpaceEventType.RIGHT_UP);
    }

HorizontalDisTool.prototype = new BaseTool();
HorizontalDisTool.prototype.endCreate = function () {
        var _that = this;
        if (_that._drawHandler) {
            _that._drawHandler.destroy();
            _that._drawHandler = null;
        }

        _that._polyline = null;
        _that._points = {};
        _that._labels = {};
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
HorizontalDisTool.prototype.clear = function () {
  var _that = this;
  if (_that._drawHandler) {
    _that._drawHandler.destroy();
    _that._drawHandler = null;
  }

  if (_that._polyline){
    _that._viewer.entities.remove(_that._polyline);
    _that._polyline = null;
  }

  for(var i = 0; i < _that._positions.length; ++i){
    if (_that._points[i]){
      _that._viewer.entities.remove(_that._points[i]);
      _that._points[i] = null;
    }

    if (_that._labels[i]){
      _that._viewer.entities.remove(_that._labels[i]);
      _that._labels[i] = null;
    }
  }
  _that._points = {};
  _that._labels = {};
};
HorizontalDisTool.prototype.createPolyline = function () {
        var _that = this;

        var callbackPositions = new Cesium.CallbackProperty(function () {
            return _that._positions;
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
    };
HorizontalDisTool.prototype.createPoint = function (index) {
        var _that = this;

        if (_that._positions.length <  index)   return;

      _that._points[index] = _that._viewer.entities.add({
        layerId: 'Measure',
        position: _that._positions[index],
        billboard: {
          image: require('../../assets/images/drag.png'),
          //eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0, 0, -500)),
          heightReference: Cesium.HeightReference.NONE
        }
      });
    }

HorizontalDisTool.prototype.createLabel = function (index) {
      var _that = this;

      if (_that._positions.length <  index + 1)   return;

      _that._labels[index] = _that._viewer.entities.add({
        layerId: 'Measure',
        position: _that._positions[index],
        label : {
          text : 'This is a Label',
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

HorizontalDisTool.prototype.getDistance = function (){
  var length = this._positions.length;
  if (length < 2) return 0;
  var _mDistance = 0;
  var geodesic = new Cesium.EllipsoidGeodesic();
  for (var i = 0; i < length - 1; ++i){
    var startcartographic = Cesium.Cartographic.fromCartesian(this._positions[i]);
    var endcartographic = Cesium.Cartographic.fromCartesian(this._positions[i + 1]);
    geodesic.setEndPoints(startcartographic, endcartographic);
    _mDistance += geodesic.surfaceDistance;
  }

  return _mDistance;
        /*var length = this._positions.length;
        if (length < 2) return 0;
        var _mDistance = 0;
        var _mRadius = 6378137;
        for (var i = 0; i < length - 1; ++i){
            var longlaal1 = this._viewer.scene.globe.ellipsoid.cartesianToCartographic(this._positions[i + 1]);
            var longlaal0 = this._viewer.scene.globe.ellipsoid.cartesianToCartographic(this._positions[i]);
            _mDistance += _mRadius * Math.acos(Math.sin(longlaal0.latitude) * Math.sin(longlaal1.latitude) +
              Math.cos(longlaal0.latitude) * Math.cos(longlaal1.latitude) * Math.cos(longlaal1.longitude - longlaal0.longitude));
        }

        return _mDistance;*/

      /*var mDistance = {
            distance2D : 0,
            distance3D : 0,
            distanceSurface : 0
        }

        var length = this._positions.length;
        if (length < 0) return mDistance;

        var geodesic = new Cesium.EllipsoidGeodesic();
        for (var i = 0; i < length - 1; ++i){
            var p1 = this._positions[i];
            var p2 = this._positions[i + 1];
            mDistance.distance2D += Cesium.Cartesian2.distance(new Cesium.Cartesian2(p1.x, p1.y), new Cesium.Cartesian2(p2.x, p2.y));
            mDistance.distance3D += Cesium.Cartesian3.distance(p1, p2);

            var pc1 = Cesium.Cartographic.fromCartesian(p1);
            var pc2 = Cesium.Cartographic.fromCartesian(p2);

            geodesic.setEndPoints(pc1, pc2);
            var s = geodesic.surfaceDistance;
            s = Math.sqrt(Math.pow(s, 2) + Math.pow(pc2.height - pc1.height, 2));
            mDistance.distanceSurface += s;
        }
        return mDistance;*/
    }

export default  HorizontalDisTool;
