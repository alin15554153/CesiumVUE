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
          heightReference: Cesium.HeightReference.NONE
        }
      });
    }

    AreaTool.prototype.getArea = function () {
        var s = 0;
        for (var i = 0; i < this._positions.length; i++) {
            var p1 = this._positions[i];
            var p2;
            if (i < this._positions.length - 1)
                p2 = this._positions[i + 1];
            else
                p2 = this._positions[0];
            s += p1.x * p2.y - p2.x * p1.y;
        }
        return Math.abs(s / 2);
    }

export default   AreaTool;
