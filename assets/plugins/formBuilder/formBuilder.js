(function($) {
    // Formbuilderın çalışmasını sağlayan ana fonksiyon.
    // Bu fonksiyon sayesinde gereken tüm bileşenler çağılıp sayfaya dahil ediliyor.
    $.fn.formBuilder = function (options) {
        $(this).createElementsContainer() //forma eklenen elemntlerin listeleneceği kapsayıcıyı oluştur.
        $(this).createPropertiesContainer() //forma eklenebilecek elementlerin listeleneceği ve özelliklerini ayarlanabileceği kapsayıcıyı oluştur.
        $(this).find('#'+settings.propertiesContainer.id).createPropertiesTabs() //Elementler ve özellikler tablarını oluştur.
        $(this).find('#'+settings.propertiesContainer.id).find('.tab-content').find('#'+settings.propertiesContainer.propertiesTabs.tabs[0].convertToEnglish()).createCreatableElements() //elemntler tabının içine forma eklenebilecek elementleri listele
    
        // Elementler listesindeki elementlere tıklayınca çalışacak event
        $('body').on('click', '#'+settings.propertiesContainer.id+' #'+settings.propertiesContainer.propertiesTabs.tabs[0].convertToEnglish()+' .list-group-item', function(){
            const elementIndex = $(this).index(); //tıklanılan elementin sırasını al
            const element = settings.propertiesContainer.elements[elementIndex] // aldığın element sırası ile jsonın içinden elementi bul
            const elementHtml = '<li class="list-group-item">'+element.name+'</li>' //bir tane liste itemi oluştur ve içine element adını yaz
            
            $('#'+settings.elementsContainer.id+' .list-group').append(elementHtml) //oluşturduğun liste itemini form listesine ekle
        });
    }

    // Kodlama standardına uymayan yazıları uygun standarda çeviren fonsiyon
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

    // Oluşturulmuş elementlerin listeleneceği kapsayıcı alanı oluşturan fonksiyon
    $.fn.createElementsContainer = function () {
        const elementsContainer = '<div id="'+settings.elementsContainer.id+'"><ul class="list-group"></ul></div>'
        $(this).append(elementsContainer)
        const classes = settings.elementsContainer.classes.map(item => $('#'+settings.elementsContainer.id).addClass(item))
    }

    // Oluşturabilinecek elementlerin listeleneceği ve element özelliklerinin listeleneceği kapsayıcı alanı oluşturan fonksiyon
    $.fn.createPropertiesContainer = function () {
        const propertiesContainer = '<div id="'+settings.propertiesContainer.id+'"></div>'
        $(this).append(propertiesContainer)
        const classes = settings.propertiesContainer.classes.map(item => $('#'+settings.propertiesContainer.id).addClass(item))
    }

    // Elementler listesinin ve özellikler listesinin ayrılabilmesi için tab menü oluşturan fonksiyon
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

    $.fn.createCreatableElements = function () {
        const elementList = '<ul class="list-group"></ul>'
        $(this).append(elementList)
        const elements = settings.propertiesContainer.elements.map(item => {
            console.log(item)
            const element = '<li class="list-group-item">'+item.name+'</li>'
            $(this).find('.list-group').append(element)
        })
    }

    // Formbuilder ayarlarını belirlediğimiz kısım
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
            },
            elements: [
                {
                    tag: 'input',
                    name: 'Kısa Yazı',
                    type: 'text',
                    attributes: [
                        {
                            name: 'name',
                            value: ''
                        },
                        {
                            name: 'required',
                            value: false
                        },
                        {
                            name: 'min',
                            value: ''
                        },
                        {
                            name: 'max',
                            value: ''
                        },
                    ]
                },
                {
                    tag: 'input',
                    name: 'Tarih',
                    type: 'date',
                    attributes: [
                        {
                            name: 'name',
                            value: ''
                        },
                        {
                            name: 'required',
                            value: false
                        },
                        {
                            name: 'min',
                            value: ''
                        },
                        {
                            name: 'max',
                            value: ''
                        },
                    ]
                },
                {
                    tag: 'input',
                    name: 'Mail',
                    type: 'email',
                    attributes: [
                        {
                            name: 'name',
                            value: ''
                        },
                        {
                            name: 'required',
                            value: false
                        },
                        {
                            name: 'min',
                            value: ''
                        },
                        {
                            name: 'max',
                            value: ''
                        },
                    ]
                },
                {
                    tag: 'select',
                    name: 'Tek Seçim',
                    type: '',
                    attributes: [
                        {
                            name: 'name',
                            value: ''
                        },
                        {
                            name: 'required',
                            value: false
                        },
                        {
                            name: 'multiple',
                            value: false
                        }
                    ]
                },
                {
                    tag: 'select',
                    name: 'Çoklu Seçim',
                    type: '',
                    attributes: [
                        {
                            name: 'name',
                            value: ''
                        },
                        {
                            name: 'required',
                            value: false
                        },
                        {
                            name: 'multiple',
                            value: true
                        }
                    ]
                },
                {
                    tag: 'textarea',
                    name: 'Uzun Yazı',
                    type: '',
                    attributes: [
                        {
                            name: 'name',
                            value: ''
                        },
                        {
                            name: 'required',
                            value: false
                        },
                        {
                            name: 'multiple',
                            value: true
                        }
                    ]
                },
            ]
        }
    }
}(jQuery))
