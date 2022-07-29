function vEditor(options,elements){
    return new vE(options,elements)
}
class vE{
    constructor(options,elements){
        this.options = options;
        this.el = options.el;
        this.elementsObj = elements;
        this.elementArr = [];
        this.activeElement = null;
        this.selectElement = null;
        this.eventInit();
        this.assistCircle = [];
        this.maxZIdex = 1;
        
        Object.keys(this.elementsObj).forEach((item,index)=>{
            this.elementsObj[item]["self"] = this.elementsObj[item]
            this.elementArr.push({
                ...this.elementsObj[item]
            })
            this.addElement(this.elementsObj[item].type,this.elementsObj[item])
        })
        this.assistCircleInit();
    }
    assistCircleInit(){
        
        for(let i=0;i<4;i++){
            
            const div = document.createElement('div');
            const ele = {
                _el:div,
                x:null,
                y:null
            }
            div.style["position"] = 'absolute';
            div.style['z-index'] = '99'
            div.style['width'] = 10+"px";
            div.style['height'] = 10+"px";
            div.style['border'] = "1px solid blue";
            div.style['border-radius'] = "100%";
            div.style['background'] = "white";
            div.style['display'] = "none";
            this.assistCircle.push(ele);
            this.box.appendChild(div);
        }
    }
    assistCircleShow(){
        this.assistCircle.forEach((item,index)=>{
            item["_el"].style.display = "unset";
        })
    }
    assistCircleHide(){
        this.assistCircle.forEach((item,index)=>{
            item["_el"].style.display = "none";
        })
    }
    assistCircleMove(){
        let x = this.activeElement["_el"].offsetLeft;
        let y = this.activeElement["_el"].offsetTop;
        let width = this.activeElement["_el"].offsetWidth;
        let height = this.activeElement["_el"].offsetHeight;
       
        this.assistCircle.forEach((item,index)=>{
            item._el.style['x']
        })
        let one = {
            x:x+width/2-5,
            y:y-5
        }
        let two = {
            x:x+width-5,
            y:y+height/2-5
        }
        let three = {
            x:x+width/2-5,
            y:y+height-5
        }
        let four = {
            x:x-5,
            y:y+height/2-5
        }
        let moveArr = [one,two,three,four]
        this.assistCircle.forEach((item,index)=>{
            item["_el"].style.top = moveArr[index].y+'px';
            item["_el"].style.left = moveArr[index].x+'px';
        })
    }
    eventInit(){
        this.box = document.querySelector(this.el);
        console.log('el',this.box)
    }
    addElement(type,element){
        switch(type){
            case 'image':
                this.imageElementInit(element);
                break;
            case 'font':
                fontElementInit(element);
                break;
        }
    }
    domAaddEventListener(dom,event,fn){
        return dom.addEventListener(event,fn)
    }
    imageElementInit(element){
        let that =this;
        const div = document.createElement('div');
        element._el = div;
        element.zindex = 1; // 层级
        element.isActive = false; // 激活
        element.isSelect = false; // 选中
        element.isMove = false; // 移动
        div.style["position"] = 'absolute'
        div.style['width'] = element.width+"px";
        div.style['height'] = element.height+"px";
        div.style['top'] = element.top+"px";
        div.style['left'] = element.left+"px";
        div.style['border'] = "1px solid black";
        div.style['z-index'] = element.zindex;
        this.box.appendChild(div);
        // 鼠标移动
        element.mouseMove = (e,downX=element.downX,downY=element.downY)=>{
           
            
            div.style.left= div.offsetLeft+e.offsetX-downX + 'px'
            div.style.top= div.offsetTop+e.offsetY-downY + 'px'
            this.assistCircleMove();

        }

        // 鼠标进入
        element.mouseOver = () =>{
            console.log('move mouseOver')
            that.activeElement = element;
            that.assistCircleShow();
            that.assistCircleMove();
        }

        // 鼠标离开
        element.mouseLeave = ()=>{
            console.log('move mouseLeave')
                this.activeElement = null;
                this.assistCircleHide();
        }
        // 监听点击 -> 选中状态
        this.domAaddEventListener(div,'click',e=>{
            console.log('click')
            that.selectElement = element;
            element.isClick = true;
        })
        
        // 进入 -> 激活状态
        this.domAaddEventListener(div,'mouseover',element.mouseOver)
        // 离开 -> 取消激活
        this.domAaddEventListener(div,'mouseleave',element.mouseLeave)
        // 按下 -> 准备监听移动事件
        this.domAaddEventListener(div,'mousedown',e=>{
            element.downX = e.offsetX;
            element.downY = e.offsetY;
            element.zindex = element.zindex +1;
            that.maxZIdex = Math.max(element.zindex,that.maxZIdex)
            element._el.style['z-index'] = 99999;

            console.log('mousedown');
            // 移动
            this.domAaddEventListener(div,'mousemove',element.mouseMove);
        })
        // 移出
        this.domAaddEventListener(div,'mouseout',e=>{
           
        })

        // 松开
        this.domAaddEventListener(div,'mouseup',e=>{
            console.log('mouseup');
            
                if(that.maxZIdex>=element.zindex){
                    element._el.style['z-index'] =that.maxZIdex+1;
                    that.maxZIdex = that.maxZIdex +1;
                }else{
                    element._el.style['z-index'] =element.zindex;
                }
            div.removeEventListener('mousemove',element.mouseMove)
        })
    }
}