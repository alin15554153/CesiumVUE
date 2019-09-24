import BaseTool from './baseTool'

function ToolTip(frameDiv){
        this._frameDiv = frameDiv;
        var div = document.createElement('DIV');
        div.className = "tooltipdiv right";//

        var arrow = document.createElement('DIV');
        arrow.className = "tooltipdiv-arrow";
        div.appendChild(arrow);

        var title = document.createElement('DIV');
        title.className = "tooltipdiv-inner";
        div.appendChild(title);

        this._div = div;
        this._title = title;

        frameDiv.appendChild(div);
    }

    ToolTip.prototype.destroy = function () {
        this._frameDiv.removeChild(this._div);
        this._div = null;
        this._title = null;
    };

    ToolTip.prototype.setVisible = function (visible) {
        this._div.style.display = visible ? 'block' : 'none';
    };

    ToolTip.prototype.showAt = function(position, content){
        if (position && content) {
            this.setVisible(true);
            this._title.innerHTML = content;
            this._div.style.left = position.x + 10 + "px";
            this._div.style.top = (position.y - this._div.clientHeight / 2) + "px";
        }
        /*if (content) {
            this.setVisible(true);
            this._title.innerHTML = content;
            this._div.style.left = 500 + 10 + "px";
            this._div.style.top = (500 - this._div.clientHeight / 2) + "px";
        }*/
    };
export default  ToolTip;
