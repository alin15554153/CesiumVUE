import BaseTool from './baseTool'
/*import ToolTip from './toolTip'*/

function PointTool(viewer, onCreate) {
        BaseTool.call(this, viewer);
        //this._tip = new ToolTip(viewer.cesiumWidget.container);
        this._onCreate = onCreate;
        this._floatingEntity = null;
        this.startDraw();
    }

    PointTool.prototype = new BaseTool();
    PointTool.prototype.startDraw = function () {
        var _that = this;
        this._drawHandler = new Cesium.ScreenSpaceEventHandler(_that._viewer.canvas);

        this._drawHandler.setInputAction(function (event) {
            var cartesian = _that.pick(event.position);
            if (!Cesium.defined(cartesian)) {
                return;
            }
            _that._onCreate(cartesian);
            _that.createEntity(cartesian);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        this._drawHandler.setInputAction(function (event) {
            var cartesian = _that.pick(event.endPosition);
            if (!Cesium.defined(cartesian)) {
                return;
            }
            _that.position = cartesian;//_that._viewer.scene.clampToHeight(cartesian);
            if (_that._floatingEntity == null) {
              _that._floatingEntity = _that.createEntity(cartesian);
            } else {
                _that._floatingEntity._label.text  = _that.getTips(cartesian);
                _that._floatingEntity.position.setValue(cartesian);
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        this._drawHandler.setInputAction(function (event) {
            _that.clear();
        }, Cesium.ScreenSpaceEventType.RIGHT_UP);
    };

    PointTool.prototype.clear = function () {
      var _this = this;
      if (_this._drawHandler) {
        _this._drawHandler.destroy();
        _this._drawHandler = null;
      }

      if (_this._floatingEntity){
          _this._viewer.entities.remove(_this._floatingEntity);
          _this._floatingEntity = null;
      }
    };

    PointTool.prototype.endCreate = function () {
        this.clear();
    };

    PointTool.prototype.getTips = function (cartesian) {
      var longlaal =this._viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
      return  '经度：' + Cesium.Math.toDegrees(longlaal.longitude).toFixed(6) +
        '°\n维度：' + Cesium.Math.toDegrees(longlaal.latitude).toFixed(6) +
        '°\n高度：' + longlaal.latitude.toFixed(3) + '米';
    }
    PointTool.prototype.createEntity = function (position) {
        return this._viewer.entities.add({
            layerId: 'Measure',
            position: position,
            description:Cesium.Cartesian3.magnitude(position).toString(),
            billboard: {
                image: require('../../assets/images/drag.png'),
                //eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0, 0, -500)),
                heightReference: Cesium.HeightReference.NONE
            },
            label : {
              text : this.getTips(position),
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

export default  PointTool;
