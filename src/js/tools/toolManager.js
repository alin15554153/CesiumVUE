import PointTool from './pointTool'
import HorizontalDisTool from './horizontalDisTool'
import VertivalDisTool from './verticalDisTool'
import AreaTool from './areaTool'

function ToolManager(viewer){
  this._viewer = viewer;
  this._toolArray = [];
}

ToolManager.prototype.clear = function () {
  for (var i = 0; i <this._toolArray.length; ++i){
    var tool = this._toolArray[i];
    if (tool){
      tool.clear();
    }
  }
  this._toolArray.length = 0;
}

ToolManager.prototype.measurePoint = function (onCreate) {
  this.clear();
  var Tool = new PointTool(this._viewer, onCreate);
  this._toolArray.push(Tool);
}

ToolManager.prototype.measureHorizontalDis = function (onCreate) {
  this.clear();

  var Tool = new HorizontalDisTool(this._viewer, onCreate);
  this._toolArray.push(Tool);
}

ToolManager.prototype.measureVerticalDis = function (onCreate) {
  this.clear();

  var Tool = new VertivalDisTool(this._viewer, onCreate);
  this._toolArray.push(Tool);
}

ToolManager.prototype.measureArea = function (onCreate) {
  this.clear();
  var Tool = new AreaTool(this._viewer, onCreate);
  this._toolArray.push(Tool);
}

/*ToolManager.prototype.createPolyline = function (onCreate) {
  this.clear();

  var Tool = new PolylineTool(this._viewer, onCreate);
  this._toolArray.push(Tool);
}

ToolManager.prototype.createPolygon = function (onCreate) {
  this.clear();

  var Tool = new PolygonTool(this._viewer, onCreate);
  this._toolArray.push(Tool);
}

ToolManager.prototype.createRectangle = function (onCreate) {
  this.clear();

  var Tool = new RectangleTool(this._viewer, onCreate);
  this._toolArray.push(Tool);
}

ToolManager.prototype.createCircle = function (onCreate) {
  this.clear();

  var Tool = new CircleTool(this._viewer, onCreate);
  this._toolArray.push(Tool);
}

ToolManager.prototype.createStraightArrowTool = function (onCreate) {
  this.clear();

  var Tool = new StraightArrowTool(this._viewer, onCreate);
  this._toolArray.push(Tool);
}

ToolManager.prototype.createAttackArrowTool = function (onCreate) {
  this.clear();

  var Tool = new AttackArrowTool(this._viewer, onCreate);
  this._toolArray.push(Tool);
}

/!**************************************************************************!/
ToolManager.prototype.measureDistance = function (onCreate) {
  this.clear();

  var Tool = new DistanceTool(this._viewer, onCreate);
  this._toolArray.push(Tool);
}

ToolManager.prototype.deletePlotting = function () {
  this.clear();

  var Tool = new DeleteTool(this._viewer);
  this._toolArray.push(Tool);
}*/

export default  ToolManager;
