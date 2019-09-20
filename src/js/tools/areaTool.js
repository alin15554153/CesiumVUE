import BaseTool from './baseTool'

function AreaTool(viewer, onCreate) {
        BaseTool.call(this, viewer);
        this._onCreate = onCreate;
        this._polygon = null;
        this._label = null;
        this._points = {};
        this._positions = [];

        var _that = this;
        this._drawHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

        this._drawHandler.setInputAction(function (event) {
            var cartesian = _that.pick(event.position);
            if (!Cesium.defined(cartesian)) {
                return;
            }
            if (_that._positions.length == 0){
                _that._positions.push(cartesian);
                _that.createPolygon();
                _that.createPoint(0);
            }
            _that._positions.push(cartesian);
            _that.createPoint(_that._positions.length - 1);
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
                var _mArea = _that.getArea();
                _that._label._label.text = _mArea < 1000000 ? _mArea.toFixed(3) + '平方米' : (_mArea / 1000000.0).toFixed(6) + '平方千米';
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        this._drawHandler.setInputAction(function (event) {
            _that._onCreate(_that._positions);
            _that.endCreate();
        }, Cesium.ScreenSpaceEventType.RIGHT_UP);
    }

AreaTool.prototype = new BaseTool();
AreaTool.prototype.endCreate = function () {
    var _that = this;
    if (_that._drawHandler) {
        _that._drawHandler.destroy();
        _that._drawHandler = null;
    }
    _that._polygon = null;
    _that._points = {};
    /*if (_that._entity){
        _that._viewer.entities.remove(_that._entity);
        _that._entity = null;
    }

    if (_that._billboards) {
        _that._viewer.scene.primitives.remove(_that._billboards);
        //_that._billboards.destroy();
        _that._billboards = null;
    }*/
};
AreaTool.prototype.clear = function () {
  var _that = this;
  if (_that._drawHandler) {
    _that._drawHandler.destroy();
    _that._drawHandler = null;
  }
  if (_that._polygon){
    _that._viewer.entities.remove(_that._polygon);
    _that._entity = null;
  }

  for(var i = 0; i < _that._positions.length; ++i){
    if (_that._points[i]){
      _that._viewer.entities.remove(_that._points[i]);
      _that._points[i] = null;
    }
  }
  _that._points = {};

  if (_that._label){
    _that._viewer.entities.remove(_that._label);
    _that._label = null;
  }
};
    AreaTool.prototype.createPolygon = function () {
        var _that = this;

        var callbackPositions = new Cesium.CallbackProperty(function () {
            return _that._positions;
        }, false);

      var callbackPosition = new Cesium.CallbackProperty(function () {
        return _that._positions[_that._positions.length - 1];
      }, false);

        _that._polygon = _that._viewer.entities.add({
            layerId: 'Measure',
            polygon: {
                hierarchy: callbackPositions,
                material: Cesium.Color.RED,
                show: true,
                outline:true,
                outlineWidth:2,
                outlineColor:Cesium.Color.GREEN
            }
        });

        _that._label = _that._viewer.entities.add({
          layerId: 'Measure',
          position: callbackPosition,
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
            horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
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
    };

    AreaTool.prototype.createPoint = function (index) {
      var _that = this;

      if (_that._positions.length <  index)   return;

      _that._points[index] = _that._viewer.entities.add({
        layerId: 'Measure',
        position: _that._positions[index],
        billboard: {
          image: require('../../assets/images/drag.png'),
          //eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0, 0, -500)),
          show : true,
          pixelOffset : new Cesium.ConstantProperty(new Cesium.Cartesian3(0, 0, -500)),
          eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
          horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
          verticalOrigin : Cesium.VerticalOrigin.CENTER,
          scale : 1.0,
          color : new Cesium.Color(1.0, 1.0, 1.0, 1.0)

        }
      });
    }

    AreaTool.prototype.getArea = function () {
        var s = 0;
        var length = this._positions.length;
        for (var i = 0; i < length - 2; i++) {
          var j = (i + 1) % length;
          var k = (i + 2) % length;

          var totalAngle = getAngle(this._positions[0], this._positions[j], this._positions[k]);

          var dis_temp1 = getDistance(this._positions[0], this._positions[j]);
          var dis_temp2 = getDistance(this._positions[j], this._positions[k]);
          s += dis_temp1 * dis_temp2 * Math.sin(totalAngle) / 2.0;
        }
        return Math.abs(s);
    }
    /*角度*/
    function getAngle(p1, p2, p3) {
      var cartographic1 = Cesium.Cartographic.fromCartesian(p1);
      var cartographic2 = Cesium.Cartographic.fromCartesian(p2);
      var cartographic3 = Cesium.Cartographic.fromCartesian(p3);

      var bearing21 = Bearing(cartographic2, cartographic1);
      var bearing23 = Bearing(cartographic2, cartographic3);
      var angle = bearing21 - bearing23;
      if (angle < 0) {
        angle += Math.PI * 2.0;
      }
      return angle;
    }
    /*方向*/
    function Bearing(from, to) {
      var angle = -Math.atan2(Math.sin(from.longitude - to.longitude) * Math.cos(to.latitude),
        Math.cos(from.latitude) * Math.sin(to.latitude) - Math.sin(from.latitude) * Math.cos(to.latitude) * Math.cos(from.longitude - to.longitude));
      if (angle < 0) {
        angle += Math.PI * 2.0;
      }
      return angle;
    }
    function getDistance(point1,point2){
        var startcartographic = Cesium.Cartographic.fromCartesian(point1);
        var endcartographic = Cesium.Cartographic.fromCartesian(point2);
        /**根据经纬度计算出距离**/
        var geodesic = new Cesium.EllipsoidGeodesic();
        geodesic.setEndPoints(startcartographic, endcartographic);
        var s = geodesic.surfaceDistance;
        s = Math.sqrt(Math.pow(s, 2) + Math.pow(endcartographic.height - startcartographic.height, 2));
        return s;
    }

export default   AreaTool;
