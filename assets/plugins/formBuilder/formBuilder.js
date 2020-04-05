(function($) {
    $.fn.formBuilder = function (options) {
        $(this).createElementsContainer()
        $(this).createPropertiesContainer()
        $(this).find('#'+settings.propertiesContainer.id).createPropertiesTabs()
    }

    String.prototype.convertToEnglish = function () {
        return this.replace(/Ğ/gim, "g")
            .replace(/ğ/gim, "g")
            .replace(/Ü/gim, "u")
            .replace(/ü/gim, "u")
            .replace(/Ş/gim, "s")
            .replace(/ş/gim, "s")
            .replace(/I/gim, "i")
            .replace(/ı/gim, "i")
            .replace(/İ/gim, "i")
            .replace(/Ö/gim, "o")
            .replace(/ö/gim, "o")
            .replace(/Ç/gim, "c")
            .replace(/ç/gim, "c")
            .replace(/ /gim,"")
            .replace(/-/gim,"")
            .replace(/\./gim,"")
            .replace(/[^a-z0-9-.çöşüğı]/gim,"")
            .toLowerCase();

    };

    $.fn.createElementsContainer = function () {
        const elementsContainer = '<div id="'+settings.elementsContainer.id+'"></div>'
        $(this).append(elementsContainer)
        const classes = settings.elementsContainer.classes.map(item => $('#'+settings.elementsContainer.id).addClass(item))
    }

    $.fn.createPropertiesContainer = function () {
        const propertiesContainer = '<div id="'+settings.propertiesContainer.id+'"></div>'
        $(this).append(propertiesContainer)
        const classes = settings.propertiesContainer.classes.map(item => $('#'+settings.propertiesContainer.id).addClass(item))
    }

    $.fn.createPropertiesTabs = function () {
        const tabHeader = '<ul class="nav nav-tabs"></ul>'
        const tabContent = '<div class="tab-content"></div>'
        $(this).append(tabHeader)
        $(this).append(tabContent)
        const tabs = settings.propertiesContainer.propertiesTabs.tabs.map(item => {
            const tabLi = '<li><a data-toggle="tab" href="#'+item.convertToEnglish()+'">'+item+'</a></li>'
            const tabDiv = '<div id="'+item.convertToEnglish()+'" class="tab-pane fade"></div>'
            $(this).find('.nav-tabs').append(tabLi)
            $(this).find('.tab-content').append(tabDiv)
        })
        $(this).find('.nav-tabs').find('li:first').addClass('active')
        $(this).find('.tab-content').find('.tab-pane:first').addClass('in').addClass('active')
    }

    const prefix = 'sfb_'
    const settings = {
        elementsContainer: {
            id: 'elementsContainer',
            classes: [prefix+'elementsContainer', 'col-md-8']
        },
        propertiesContainer: {
            id: 'propertiesContainer',
            classes: [prefix+'propertiesContainer', 'col-md-4'],
            propertiesTabs: {
                tabs: ['Elementler', 'Özellikler']
            }
        }
    }
}(jQuery))
