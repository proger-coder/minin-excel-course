//для более удобной работы с DOM-деревом
class Dom{
    constructor(selector) {     //----НАХОДИТ ЭЛЕМЕНТ И ЦЕПЛЯЕТ ЗА $el--------------------
                                //--ПРИНИМАЕТ СЕЛЕКТОР ИЛИ ЭЛЕМЕНТ(НОДУ) ЦЕЛИКОМ ДАЖЕ------
        this.$el = typeof selector === 'string' //если строка
        ? document.querySelector(selector) //присваивает в $el первое, что нашлось по selector
        : selector      //а если нам передали целиком ДОМ-ноду, то просто присваиваем
}

    html(html) { //-----МЕТОД ОБРАБОТКИ HTML-СОДЕРЖИМОГО ДЛЯ НАЙДЕННОГО ВЫШЕ ЭЛЕМЕНТА $el-----------------------
        // геттер или сеттер: если ничего не передаём, то это геттеР; если передаём, то Сеттер
        if(typeof html === 'string') {
            this.$el.innerHTML = html   // назначаем значение из переданного
            return this   // а зачем?? а чтобы было к чему цеплять цепочки методов, напрмимер .clear()
        }
        return this.$el.outerHTML.trim() //а если ничего не передали, то возвращаем обрезанную обёртку this.$el
    }

    clear() {
        this.html('') //очистим HTML
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    //element
    append(node) {
        if(node instanceof Dom){
            node = node.$el
        }

        if (Element.prototype.append) { //если такой метод присутствует в базовом классе Element
            this.$el.append(node)
        }
        else {
            this.$el.appendChild(node)
        }

        return this
    }
}

//event.target
export function $(selector){ //----СОЗДАЁТ НОВЫЙ ЭКЗЕМПЛЯР КЛАССА Dom, ГДЕ ПО СЕЛЕКТОРУ ПОДЦЕПЛЯЕТ ЭЛЕМЕНТ В $el
    return new Dom(selector);//---ЛИБО ПРИНИМАЕТ И ПОДЦЕПЛЯЕТ НОДУ ЦЕЛИКОМ...И ВОЗВРАЩАЕТ ЭТОТ ЭКЗЕМПЛЯР
}

$.create = (tagname, classes = '') => { //СОЗДАЁТ НОВЫЙ ЭЛЕМЕНТ ИЗ ТЕГОВ И ДАЖЕ С КЛАССАМИ(если их ей передали)
    // это метод функции $, так как она возвращает экземпляр класса DOM
    const el = document.createElement(tagname);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el)
}