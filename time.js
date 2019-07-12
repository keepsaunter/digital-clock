var Util = {
    addNumNode(parentNodeId, id) {  //新加Num节点
        var containerNode = document.getElementById(parentNodeId);
        var numDiv = document.createElement('div');
        numDiv.classList.add('number');
        numDiv.id=id;
        numDiv.innerHTML = '<div class="vertical"></div><div class="vertical"></div><div class="vertical"></div><div class="vertical"></div><div class="horizontal"></div><div class="horizontal"></div><div class="horizontal"></div>';
        containerNode.appendChild(numDiv);
    },
    lightNode(id, indexArr) {   //让Num节点的部分边显示
        Array.prototype.slice.call(document.querySelectorAll('#' + id + ' div')).forEach(function(node, index) {
            if(~indexArr.indexOf(index)) {
                node.classList.add('light');
            }else {
                node.classList.remove('light');
            }
        });
    },
    objectAssign(obj1, obj2) {
        if(Object.assign) {
            return Object.assign(obj1, obj2);
        }else {
            if(Object.keys) {
                var keys = Object.keys(obj2), key;
                for(var keyIndex = 0; keyIndex < keys.length; keyIndex ++) {
                    key = keys[keyIndex];
                    obj1[key] = obj2[key];
                }
            }else {
                for(var key in obj2) {
                    if(obj2.hasOwnProperty[key]) {
                        obj1[key] = obj2[key];
                    }
                }
            }
            return obj1;
        }
    }
}

// 构造函数
function Num(parentId, id, initVal) {
    Util.addNumNode(parentId, id);
    this.id = id;
    this.val = initVal || 0;
    this.setVal(this.val);
}

Num.prototype.setVal = function(val) {  //设置值
    this.val = val;
    var lightNodeArr = [];
    switch(val) {
        case 0: lightNodeArr = [0, 1, 2, 3, 4, 6];break;
        case 1: lightNodeArr = [1, 3];break;
        case 2: lightNodeArr = [1, 2, 4, 5, 6];break;
        case 3: lightNodeArr = [1, 3, 4, 5, 6];break;
        case 4: lightNodeArr = [0, 1, 3, 5];break;
        case 5: lightNodeArr = [0, 3, 4, 5, 6];break;
        case 6: lightNodeArr = [0, 2, 3, 4, 5, 6];break;
        case 7: lightNodeArr = [1, 3, 4];break;
        case 8: lightNodeArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];break;
        case 9: lightNodeArr = [0, 1, 3, 4, 5, 6];break;
        default: break;
    }
    Util.lightNode(this.id, lightNodeArr);
}

Num.initCssStyle = function(options = {}) { //为数字时钟添加css//初始化时调用
    options = Util.objectAssign({
        widthNum: 24,
        heightNum: 8,
        offsetNum: 1,
        lengthUnit: 'px',
        defaultColor: '#E0E0E0',
        lightColor: 'red'
    }, options)
    var cssNode = document.createElement('style');

    cssNode.innerText = '.number {'+
    '            position: relative;'+
    `            width: ${options.widthNum + options.heightNum * 2 + options.offsetNum * 2 + options.lengthUnit};`+
    `            height: ${options.widthNum * 2 + options.heightNum * 3 + options.lengthUnit};`+
    '        }'+
    '        .number .horizontal {'+
    `            margin-left: ${options.heightNum + options.offsetNum + options.lengthUnit};`+
    '        }'+
    '        .number .horizontal:not(:last-child) {'+
    `            margin-bottom: ${options.widthNum + options.lengthUnit};`+
    '        }'+
    '        .number .horizontal, .number .vertical {'+
    '            position: relative;'+
    '            transition: all 0.1s;'+
    `            background-color: ${options.defaultColor};`+
    '        }'+
    '        .number .vertical {'+
    '            position: absolute;'+
    '        }'+
    '        .number .vertical:nth-child(1), .number .vertical:nth-child(2) {'+
    `            top: ${options.heightNum + options.lengthUnit};`+
    '        }'+
    '        .number .vertical:nth-child(2) {'+
    '            right: 0;'+
    '        }'+
    '        .number .vertical:nth-child(3), .number .vertical:nth-child(4) {'+
    `            top: ${options.heightNum * 2 + options.widthNum + options.lengthUnit};`+
    '        }'+
    '        .number .vertical:nth-child(4) {'+
    '            right: 0;'+
    '        }'+
    '        .number .horizontal {'+
    `            width: ${options.widthNum + options.lengthUnit};`+
    `            height: ${options.heightNum + options.lengthUnit};`+
    '        }'+
    '        .number .horizontal::before, .number .horizontal::after {'+
    '            position: absolute;'+
    '            content: "";'+
    '            top: 0;'+
    '            width: 0;'+
    '            height: 0;'+
    `            border: ${options.heightNum / 2 + options.lengthUnit} solid transparent;`+
    '        }'+
    '        .number .horizontal::before {'+
    '            left: 0;'+
    '            transform: translateX(-100%);'+
    `            border-right-color: ${options.defaultColor};`+
    '            border-left-width: 0;'+
    '        }'+
    '        .number .horizontal::after {'+
    '            right: 0;'+
    '            transform: translateX(100%);'+
    `            border-left-color: ${options.defaultColor};`+
    '            border-right-width: 0;'+
    '        }'+
    '        .number .vertical {'+
    `            height: ${options.widthNum + options.lengthUnit};`+
    `            width: ${options.heightNum + options.lengthUnit};`+
    '        }'+
    '        .number .vertical::before, .number .vertical::after {'+
    '            position: absolute;'+
    '            content: "";'+
    '            width: 0;'+
    '            height: 0;'+
    `            border: ${options.heightNum / 2 + options.lengthUnit} solid transparent;`+
    '            left: 0;'+
    '        }'+
    '        .number .vertical::before {'+
    '            top: 0;'+
    '            transform: translateY(-100%);'+
    `            border-bottom-color: ${options.defaultColor};`+
    '            border-top-width: 0;'+
    '        }'+
    '        .number .vertical::after {'+
    '            bottom: 0;'+
    '            transform: translateY(100%);'+
    `            border-top-color: ${options.defaultColor};`+
    '            border-bottom-width: 0;'+
    '        }'+
    '        .number .light {'+
    `            background-color: ${options.lightColor};`+
    '        }'+
    '        .number .light.vertical::before {'+
    `            border-bottom-color: ${options.lightColor};`+
    '        }'+
    '        .number .light.vertical::after {'+
    `            border-top-color: ${options.lightColor};`+
    '        }'+
    '        .number .light.horizontal::before {'+
    `            border-right-color: ${options.lightColor};`+
    '        }'+
    '        .number .light.horizontal::after {'+
    `            border-left-color: ${options.lightColor};`+
    '        }';
    document.querySelector('head').appendChild(cssNode);
};