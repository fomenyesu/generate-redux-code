import $ from 'jquery'

const ajax = (settings) => {
    settings = {
        ...{
            contentType: 'application/jsoncharset=utf-8',
            dataType: 'json',
            method: 'POST',
        },
        ...settings
    }
    if (settings.data&&typeof(settings.data)!="string"&&settings.method.toUpperCase()!="GET") {
        settings.data = JSON.stringify(settings.data)
    }
    let ajax = $.ajax(settings)

    return ajax
}

export default ajax
