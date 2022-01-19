if(SalebotTildaIntegration == undefined){
    var prod = "https://salebot.pro"
    var test = "https://salebot.zmservice.ru"
    var local = "http://localhost:3000"
    var domain_with_protocol = prod
    function createHref(className, askPhone, askEmail, askName, name_important, askFbCookie, askGaCookie, askYmCookie, askRsCookie, askFbcCookie, validatePhone, validateEmail, askComagicCookie) {
        var parent_class = $("."+className).parents(".salebot_tilda_block")
        if(parent_class.length == 0){
            parent_class = $("."+className).parents("#salebot_tilda_block")
        }
        var phoneValue = parent_class.find('.phone_input').val()
        var emailValue = parent_class.find('.email_input').val()
        var nameValue = parent_class.find('.name_input').val()
        var mainHref = parent_class.find('.' + className).attr('href')
        name_important = name_important == 'true'
        askPhone = askPhone == 'true'
        validatePhone = validatePhone == 'true'
        askEmail = askEmail == 'true'
        validateEmail = validateEmail == 'true'
        askName = askName == 'true'
        var phone = ''
        var email = ''
        var name = ''
        var counter = 0
        if (askPhone) {
            phoneValue = (parent_class.find('.select_mask_code').text() + phoneValue).replace(/[+|| ]/g, '')
            if (validatePhone) {
                let phone_trig = phoneValue.match(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/g) != null
                if (phone_trig) {
                    phone = '&phone=' + phoneValue
                    mainHref = mainHref + phone
                    counter++
                } else {
                    parent_class.find('.invalid-feedback_phone_validation').css('display', 'block')
                }
            } else {
                phone = '&phone=' + phoneValue
                mainHref = mainHref + phone
                counter++
            }
        } else {
            counter++
        }
        if (askEmail) {
            if (validateEmail) {
                let email_trig = emailValue.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g) != null
                if (email_trig) {
                    email = emailValue != '' ? '&email=' + emailValue : ''
                    mainHref = mainHref + email
                    counter++
                } else {
                    parent_class.find('.invalid-feedback_email_validation').css('display', 'block')
                }
            } else {
                email = emailValue != '' ? '&email=' + emailValue : ''
                mainHref = mainHref + email
                counter++
            }
        } else {
            counter++
        }
        if (askName) {
            let name_trig_one = nameValue != '' || !name_important
            if (name_trig_one) {
                name = nameValue != '' ? '&name_from_ml=' + nameValue : ''
                mainHref = mainHref + name
                counter++
            } else {
                parent_class.find('.invalid-feedback_name').css('display', 'block')
            }
        } else {
            counter++
        }
        if (counter == 3) {
            window.location.href = mainHref + mini_landing_init(askFbCookie, askGaCookie, askYmCookie, askRsCookie, askFbcCookie, askComagicCookie)
        }
    }
    function retarded(className) {
        if ($("."+className).val() != '') {
            $("."+className+"_invalid").css("display", 'none')
        }
    }

    function copy_func(){
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(".message_to_copy").text()).select();
        document.execCommand("copy");
        $temp.remove();
        $(".copy_popup").slideDown()
        setTimeout(function (){
            $(".copy_popup").slideUp()
        }, 4000)
    }
    function mini_landing_init(askFbCookie, askGaCookie, askYmCookie, askRsCookie, askFbcCookie, askComagicCookie) {
        function get_cookie(cookie_name) {
            if (cookie_name == '') return false
            var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

            if (results)
                return (unescape(results[2]));
            else
                return false;
        }

        var fbc_cookie = askFbcCookie ? '_fbc' : ''
        var fb_cookie = askFbCookie ? '_fbp' : ''
        var ga_cookie = askGaCookie ? '_ga' : ''
        var ym_cookie = askYmCookie ? '_ym_uid' : ''
        var rs_cookie = askRsCookie ? 'roistat_visit' : ''
        var comagic_cookie = askComagicCookie ? '_comagic_idzLMDd' : ''


        var cookies_names = [fb_cookie, ga_cookie, ym_cookie, rs_cookie, fbc_cookie, comagic_cookie];
        var cookie_string = ''
        if(typeof Comagic != 'undefined'){
            let cm_cookie = Comagic.getSessionId()
            console.log(cm_cookie)
            if(cm_cookie){
                cookie_string += `&comagic_cookie='${cm_cookie}'`;
            }
        }
        Array.prototype.forEach.call(cookies_names, function (cookie_name) {
            let cookie_val = get_cookie(cookie_name); //id фейсбука для примера
            if(cookie_name == "_comagic_idzLMDd" && cookie_val !== false){
                cookie_val = cookie_val.split(".")[1]
            }
            if (cookie_val !== false) {
                cookie_string += "&" + cookie_name + "='" + cookie_val + "'";
            }
        });
        return cookie_string
    }
    var counter_arr = []
    var SalebotTildaIntegration = (function (){
        var blocks_count = 0

        return {
            init: function (options){
                if(document.getElementsByClassName("salebot_tilda_block")[blocks_count]){
                    let block = document.getElementsByClassName("salebot_tilda_block")[blocks_count]
                    let ident = Math.random().toString(36).slice(2)
                    counter_arr.push(ident)
                    block.classList.add(ident)
                    initTildaBlock(options, block, ident)
                    blocks_count+=1
                }else if(document.getElementById("salebot_tilda_block")){
                    let block = document.getElementById("salebot_tilda_block")
                    let ident = Math.random().toString(36).slice(2)
                    block.classList.add(ident)
                    initTildaBlock(options, block, ident)
                }
            }
        }
        function initTildaBlock (options, block, identifier){
            var xhr = new XMLHttpRequest();
            var link         = document.createElement("link")
            var script2      = document.createElement("script")
            var script3      = document.createElement("script")
            var script4      = document.createElement("script")
            var initer = function(ident){
                var countries = {
                    "+7": ["Kazakhstan (Қазақстан)", "kz", "7", '(812) 345-67-89', [3, 3, 2, 2], true],
                    "7": ["Russia (Россия)", "ru", "7", "(912) 345-67-89", [3, 3, 2, 2], true, 8],
                    "380": ["Ukraine (Україна)", "ua", "380", '98 123 4567', [2, 3, 4], true, 0],
                    "93": ["Afghanistan (‫افغانستان‬‎)", "af", "93", undefined, undefined, false],
                    "355": ["Albania (Shqipëri)", "al", "355", undefined, undefined, false],
                    "213": ["Algeria (‫الجزائر‬‎)", "dz", "213", undefined, undefined, false],
                    "1684": ["American Samoa", "as", "1684", undefined, undefined, false],
                    "376": ["Andorra", "ad", "376", undefined, undefined, false],
                    "244": ["Angola", "ao", "244", undefined, undefined, false],
                    "1264": ["Anguilla", "ai", "1264", undefined, undefined, false],
                    "1268": ["Antigua and Barbuda", "ag", "1268", undefined, undefined, false],
                    "54": ["Argentina", "ar", "54", undefined, undefined, false],
                    "374": ["Armenia (Հայաստան)", "am", "374", undefined, undefined, true],
                    "297": ["Aruba", "aw", "297", undefined, undefined, false],
                    "61": ["Australia", "au", "61", undefined, undefined, false],
                    "43": ["Austria (Österreich)", "at", "43", undefined, undefined, false],
                    "994": ["Azerbaijan (Azərbaycan)", "az", "994", undefined, undefined, true],
                    "1242": ["Bahamas", "bs", "1242",undefined, undefined, false],
                    "973": ["Bahrain (‫البحرين‬‎)", "bh", "973", undefined, undefined, false],
                    "880": ["Bangladesh (বাংলাদেশ)", "bd", "880",undefined, undefined, false],
                    "1246": ["Barbados", "bb", "1246",undefined, undefined, false],
                    "375": ["Belarus (Беларусь)", "by", "375",undefined, undefined, true],
                    "32": ["Belgium (België)", "be", "32",undefined, undefined, false],
                    "501": ["Belize", "bz", "501",undefined, undefined, false],
                    "229": ["Benin (Bénin)", "bj", "229",undefined, undefined, false],
                    "1441": ["Bermuda", "bm", "1441",undefined, undefined, false],
                    "975": ["Bhutan (འབྲུག)", "bt", "975",undefined, undefined, false],
                    "591": ["Bolivia", "bo", "591",undefined, undefined, false],
                    "387": ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387",undefined, undefined, false],
                    "267": ["Botswana", "bw", "267",undefined, undefined, false],
                    "55": ["Brazil (Brasil)", "br", "55",undefined, undefined, false],
                    "246": ["British Indian Ocean Territory", "io", "246",undefined, undefined, false],
                    "1284": ["British Virgin Islands", "vg", "1284",undefined, undefined, false],
                    "673": ["Brunei", "bn", "673",undefined, undefined, false],
                    "359": ["Bulgaria (България)", "bg", "359",undefined, undefined, true],
                    "226": ["Burkina Faso", "bf", "226",undefined, undefined, false],
                    "257": ["Burundi (Uburundi)", "bi", "257",undefined, undefined, false],
                    "855": ["Cambodia (កម្ពុជា)", "kh", "855",undefined, undefined, false],
                    "237": ["Cameroon (Cameroun)", "cm", "237",undefined, undefined, false],
                    "238": ["Cape Verde (Kabu Verdi)", "cv", "238",undefined, undefined, false],
                    "599": ["Caribbean Netherlands", "bq", "599",undefined, undefined, false],
                    "1345": ["Cayman Islands", "ky", "1345",undefined, undefined, false],
                    "236": ["Central African Republic (République centrafricaine)", "cf", "236",undefined, undefined, false],
                    "235": ["Chad (Tchad)", "td", "235",undefined, undefined, false],
                    "56": ["Chile", "cl", "56",undefined, undefined, false],
                    "86": ["China (中国)", "cn", "86",undefined, undefined, false],
                    "57": ["Colombia", "co", "57",undefined, undefined, false],
                    "269": ["Comoros (‫جزر القمر‬‎)", "km", "269",undefined, undefined, false],
                    "243": ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243",undefined, undefined, false],
                    "242": ["Congo (Republic) (Congo-Brazzaville)", "cg", "242",undefined, undefined, false],
                    "682": ["Cook Islands", "ck", "682",undefined, undefined, false],
                    "506": ["Costa Rica", "cr", "506",undefined, undefined, false],
                    "225": ["Côte d’Ivoire", "ci", "225",undefined, undefined, false],
                    "385": ["Croatia (Hrvatska)", "hr", "385",undefined, undefined, false],
                    "53": ["Cuba", "cu", "53",undefined, undefined, false],
                    "357": ["Cyprus (Κύπρος)", "cy", "357",undefined, undefined, true],
                    "420": ["Czech Republic (Česká republika)", "cz", "420",undefined, undefined, true],
                    "45": ["Denmark (Danmark)", "dk", "45",undefined, undefined, false],
                    "253": ["Djibouti", "dj", "253",undefined, undefined, false],
                    "1767": ["Dominica", "dm", "1767",undefined, undefined, false],
                    "593": ["Ecuador", "ec", "593",undefined, undefined, false],
                    "20": ["Egypt (‫مصر‬‎)", "eg", "20",undefined, undefined, true],
                    "503": ["El Salvador", "sv", "503",undefined, undefined, false],
                    "240": ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240",undefined, undefined, false],
                    "291": ["Eritrea", "er", "291",undefined, undefined, false],
                    "372": ["Estonia (Eesti)", "ee", "372",undefined, undefined, true],
                    "251": ["Ethiopia", "et", "251",undefined, undefined, false],
                    "500": ["Falkland Islands (Islas Malvinas)", "fk", "500",undefined, undefined, false],
                    "298": ["Faroe Islands (Føroyar)", "fo", "298",undefined, undefined, false],
                    "679": ["Fiji", "fj", "679",undefined, undefined, false],
                    "358": ["Finland (Suomi)", "fi", "358",undefined, undefined, false],
                    "33": ["France", "fr", "33",undefined, undefined, false],
                    "594": ["French Guiana (Guyane française)", "gf", "594",undefined, undefined, false],
                    "689": ["French Polynesia (Polynésie française)", "pf", "689",undefined, undefined, false],
                    "241": ["Gabon", "ga", "241",undefined, undefined, false],
                    "220": ["Gambia", "gm", "220",undefined, undefined, false],
                    "995": ["Georgia (საქართველო)", "ge", "995",undefined, undefined, true],
                    "49": ["Germany (Deutschland)", "de", "49",undefined, undefined, false],
                    "233": ["Ghana (Gaana)", "gh", "233",undefined, undefined, false],
                    "350": ["Gibraltar", "gi", "350",undefined, undefined, false],
                    "30": ["Greece (Ελλάδα)", "gr", "30",undefined, undefined, false],
                    "299": ["Greenland (Kalaallit Nunaat)", "gl", "299",undefined, undefined, false],
                    "1473": ["Grenada", "gd", "1473",undefined, undefined, false],
                    "590": ["Guadeloupe", "gp", "590",undefined, undefined, false],
                    "1671": ["Guam", "gu", "1671",undefined, undefined, false],
                    "502": ["Guatemala", "gt", "502",undefined, undefined, false],
                    "224": ["Guinea (Guinée)", "gn", "224",undefined, undefined, false],
                    "245": ["Guinea-Bissau (Guiné Bissau)", "gw", "245",undefined, undefined, false],
                    "592": ["Guyana", "gy", "592",undefined, undefined, false],
                    "509": ["Haiti", "ht", "509",undefined, undefined, false],
                    "504": ["Honduras", "hn", "504",undefined, undefined, true],
                    "852": ["Hong Kong (香港)", "hk", "852",undefined, undefined, false],
                    "36": ["Hungary (Magyarország)", "hu", "36",undefined, undefined, true],
                    "354": ["Iceland (Ísland)", "is", "354",undefined, undefined, false],
                    "91": ["India (भारत)", "in", "91",undefined, undefined, false],
                    "62": ["Indonesia", "id", "62",undefined, undefined, false],
                    "98": ["Iran (‫ایران‬‎)", "ir", "98",undefined, undefined, true],
                    "964": ["Iraq (‫العراق‬‎)", "iq", "964",undefined, undefined, true],
                    "353": ["Ireland", "ie", "353",undefined, undefined, false],
                    "972": ["Israel (‫ישראל‬‎)", "il", "972",undefined, undefined, true],
                    "39": ["Italy (Italia)", "it", "39",undefined, undefined, false],
                    "1876": ["Jamaica", "jm", "1876",undefined, undefined, false],
                    "81": ["Japan (日本)", "jp", "81",undefined, undefined, false],
                    "962": ["Jordan (‫الأردن‬‎)", "jo", "962",undefined, undefined, false],
                    "254": ["Kenya", "ke", "254",undefined, undefined, false],
                    "686": ["Kiribati", "ki", "686",undefined, undefined, false],
                    "965": ["Kuwait (‫الكويت‬‎)", "kw", "965",undefined, undefined, false],
                    "996": ["Kyrgyzstan (Кыргызстан)", "kg", "996",undefined, undefined, true],
                    "856": ["Laos (ລາວ)", "la", "856",undefined, undefined, false],
                    "371": ["Latvia (Latvija)", "lv", "371",undefined, undefined, true],
                    "961": ["Lebanon (‫لبنان‬‎)", "lb", "961",undefined, undefined, false],
                    "266": ["Lesotho", "ls", "266",undefined, undefined, false],
                    "231": ["Liberia", "lr", "231",undefined, undefined, false],
                    "218": ["Libya (‫ليبيا‬‎)", "ly", "218",undefined, undefined, true],
                    "423": ["Liechtenstein", "li", "423",undefined, undefined, false],
                    "370": ["Lithuania (Lietuva)", "lt", "370",undefined, undefined, false],
                    "352": ["Luxembourg", "lu", "352",undefined, undefined, false],
                    "853": ["Macau (澳門)", "mo", "853",undefined, undefined, false],
                    "389": ["Macedonia (FYROM) (Македонија)", "mk", "389"],
                    "261": ["Madagascar (Madagasikara)", "mg", "261",undefined, undefined, false],
                    "265": ["Malawi", "mw", "265",undefined, undefined, false],
                    "60": ["Malaysia", "my", "60",undefined, undefined, false],
                    "960": ["Maldives", "mv", "960",undefined, undefined, false],
                    "223": ["Mali", "ml", "223",undefined, undefined, false],
                    "356": ["Malta", "mt", "356",undefined, undefined, false],
                    "692": ["Marshall Islands", "mh", "692",undefined, undefined, false],
                    "596": ["Martinique", "mq", "596",undefined, undefined, false],
                    "222": ["Mauritania (‫موريتانيا‬‎)", "mr", "222",undefined, undefined, false],
                    "230": ["Mauritius (Moris)", "mu", "230",undefined, undefined, false],
                    "52": ["Mexico (México)", "mx", "52",undefined, undefined, false],
                    "691": ["Micronesia", "fm", "691",undefined, undefined, false],
                    "373": ["Moldova (Republica Moldova)", "md", "373",undefined, undefined, true],
                    "377": ["Monaco", "mc", "377",undefined, undefined, false],
                    "976": ["Mongolia (Монгол)", "mn", "976",undefined, undefined, true],
                    "382": ["Montenegro (Crna Gora)", "me", "382",undefined, undefined, false],
                    "1664": ["Montserrat", "ms", "1664",undefined, undefined, false],
                    "212": ["Morocco (‫المغرب‬‎)", "ma", "212",undefined, undefined, false],
                    "258": ["Mozambique (Moçambique)", "mz", "258",undefined, undefined, false],
                    "95": ["Myanmar (Burma) (မြန်မာ)", "mm", "95",undefined, undefined, false],
                    "264": ["Namibia (Namibië)", "na", "264",undefined, undefined, false],
                    "674": ["Nauru", "nr", "674",undefined, undefined, false],
                    "977": ["Nepal (नेपाल)", "np", "977",undefined, undefined, false],
                    "31": ["Netherlands (Nederland)", "nl", "31",undefined, undefined, false],
                    "687": ["New Caledonia (Nouvelle-Calédonie)", "nc", "687",undefined, undefined, false],
                    "64": ["New Zealand", "nz", "64",undefined, undefined, false],
                    "505": ["Nicaragua", "ni", "505",undefined, undefined, false],
                    "227": ["Niger (Nijar)", "ne", "227",undefined, undefined, false],
                    "234": ["Nigeria", "ng", "234",undefined, undefined, false],
                    "683": ["Niue", "nu", "683",undefined, undefined, false],
                    "672": ["Norfolk Island", "nf", "672",undefined, undefined, false],
                    "850": ["North Korea (조선 민주주의 인민 공화국)", "kp", "850",undefined, undefined, false],
                    "1670": ["Northern Mariana Islands", "mp", "1670",undefined, undefined, false],
                    "47": ["Norway (Norge)", "no", "47",undefined, undefined, false],
                    "968": ["Oman (‫عُمان‬‎)", "om", "968",undefined, undefined, false],
                    "92": ["Pakistan (‫پاکستان‬‎)", "pk", "92",undefined, undefined, true],
                    "680": ["Palau", "pw", "680",undefined, undefined, false],
                    "970": ["Palestine (‫فلسطين‬‎)", "ps", "970",undefined, undefined, false],
                    "507": ["Panama (Panamá)", "pa", "507",undefined, undefined, false],
                    "675": ["Papua New Guinea", "pg", "675",undefined, undefined, false],
                    "595": ["Paraguay", "py", "595",undefined, undefined, false],
                    "51": ["Peru (Perú)", "pe", "51",undefined, undefined, false],
                    "63": ["Philippines", "ph", "63",undefined, undefined, false],
                    "48": ["Poland (Polska)", "pl", "48",undefined, undefined, true],
                    "351": ["Portugal", "pt", "351",undefined, undefined, false],
                    "974": ["Qatar (‫قطر‬‎)", "qa", "974",undefined, undefined, false],
                    "262": ["Réunion (La Réunion)", "re", "262",undefined, undefined, false],
                    "40": ["Romania (România)", "ro", "40",undefined, undefined, true],
                    "250": ["Rwanda", "rw", "250",undefined, undefined, false],
                    "290": ["Saint Helena", "sh", "290",undefined, undefined, false],
                    "1869": ["Saint Kitts and Nevis", "kn", "1869",undefined, undefined, false],
                    "1758": ["Saint Lucia", "lc", "1758",undefined, undefined, false],
                    "508": ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508",undefined, undefined, false],
                    "1784": ["Saint Vincent and the Grenadines", "vc", "1784",undefined, undefined, false],
                    "685": ["Samoa", "ws", "685",undefined, undefined, false],
                    "378": ["San Marino", "sm", "378",undefined, undefined, false],
                    "239": ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239",undefined, undefined, false],
                    "966": ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966",undefined, undefined, true],
                    "221": ["Senegal (Sénégal)", "sn", "221",undefined, undefined, false],
                    "381": ["Serbia (Србија)", "rs", "381",undefined, undefined, true],
                    "248": ["Seychelles", "sc", "248",undefined, undefined, false],
                    "232": ["Sierra Leone", "sl", "232",undefined, undefined, false],
                    "65": ["Singapore", "sg", "65",undefined, undefined, false],
                    "1721": ["Sint Maarten", "sx", "1721",undefined, undefined, false],
                    "421": ["Slovakia (Slovensko)", "sk", "421",undefined, undefined, true],
                    "386": ["Slovenia (Slovenija)", "si", "386",undefined, undefined, true],
                    "677": ["Solomon Islands", "sb", "677",undefined, undefined, false],
                    "252": ["Somalia (Soomaaliya)", "so", "252",undefined, undefined, false],
                    "27": ["South Africa", "za", "27",undefined, undefined, false],
                    "82": ["South Korea (대한민국)", "kr", "82",undefined, undefined, false],
                    "211": ["South Sudan (‫جنوب السودان‬‎)", "ss", "211",undefined, undefined, false],
                    "34": ["Spain (España)", "es", "34",undefined, undefined, false],
                    "94": ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94",undefined, undefined, false],
                    "249": ["Sudan (‫السودان‬‎)", "sd", "249",undefined, undefined, true],
                    "597": ["Suriname", "sr", "597",undefined, undefined, false],
                    "268": ["Swaziland", "sz", "268",undefined, undefined, false],
                    "46": ["Sweden (Sverige)", "se", "46",undefined, undefined, false],
                    "41": ["Switzerland (Schweiz)", "ch", "41",undefined, undefined, false],
                    "963": ["Syria (‫سوريا‬‎)", "sy", "963",undefined, undefined, true],
                    "886": ["Taiwan (台灣)", "tw", "886",undefined, undefined, false],
                    "992": ["Tajikistan", "tj", "992",undefined, undefined, false],
                    "255": ["Tanzania", "tz", "255",undefined, undefined, false],
                    "66": ["Thailand (ไทย)", "th", "66",undefined, undefined, false],
                    "670": ["Timor-Leste", "tl", "670",undefined, undefined, false],
                    "228": ["Togo", "tg", "228",undefined, undefined, false],
                    "690": ["Tokelau", "tk", "690",undefined, undefined, false],
                    "676": ["Tonga", "to", "676",undefined, undefined, false],
                    "1868": ["Trinidad and Tobago", "tt", "1868",undefined, undefined, false],
                    "216": ["Tunisia (‫تونس‬‎)", "tn", "216",undefined, undefined, false],
                    "90": ["Turkey (Türkiye)", "tr", "90",undefined, undefined, false],
                    "993": ["Turkmenistan", "tm", "993",undefined, undefined, true],
                    "1649": ["Turks and Caicos Islands", "tc", "1649",undefined, undefined, false],
                    "688": ["Tuvalu", "tv", "688",undefined, undefined, false],
                    "1340": ["U.S. Virgin Islands", "vi", "1340",undefined, undefined, false],
                    "256": ["Uganda", "ug", "256",undefined, undefined, false],
                    "971": ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971",undefined, undefined, true],
                    "44": ["United Kingdom", "gb", "44",undefined, undefined, true],
                    "1": ["United States", "us", "1",undefined, undefined, true],
                    "598": ["Uruguay", "uy", "598",undefined, undefined, false],
                    "998": ["Uzbekistan (Oʻzbekiston)", "uz", "998",undefined, undefined, true],
                    "678": ["Vanuatu", "vu", "678",undefined, undefined, false],
                    "58": ["Venezuela", "ve", "58",undefined, undefined, true],
                    "84": ["Vietnam (Việt Nam)", "vn", "84",undefined, undefined, true],
                    "681": ["Wallis and Futuna", "wf", "681",undefined, undefined, false],
                    "967": ["Yemen (‫اليمن‬‎)", "ye", "967",undefined, undefined, false],
                    "260": ["Zambia", "zm", "260",undefined, undefined, false],
                    "263": ["Zimbabwe", "zw", "263",undefined, undefined, false]
                }
                var letter_code = [
                    ['a', '🇦'],
                    ['b', '🇧'],
                    ['c', '🇨'],
                    ['d', '🇩'],
                    ['e', '🇪'],
                    ['f', '🇫'],
                    ['g', '🇬'],
                    ['h', '🇭'],
                    ['i', '🇮'],
                    ['j', '🇯'],
                    ['k', '🇰'],
                    ['l', '🇱'],
                    ['m', '🇲'],
                    ['n', '🇳'],
                    ['o', '🇴'],
                    ['p', '🇵'],
                    ['q', '🇶'],
                    ['r', '🇷'],
                    ['s', '🇸'],
                    ['t', '🇹'],
                    ['u', '🇺'],
                    ['v', '🇻'],
                    ['w', '🇼'],
                    ['x', '🇽'],
                    ['y', '🇾'],
                    ['z', '🇿']
                ];
                var prev_pat_num = 1
                var html_to_append = ''
                function get_flag(country_code) {
                    letter_code.forEach(function (item) {
                        let rexExp = new RegExp(item[0], 'g')
                        country_code = country_code.replace(rexExp, item[1])
                    })
                    return country_code
                }
                function resize_input() {
                }
                function get_country_arr(str) {
                    let item = countries[str]
                    if (item == undefined) {
                        if (str.length <= 1) {
                            return undefined
                        }
                        return get_country_arr(str.slice(0, str.length - 1))
                    } else {
                        return item
                    }
                }
                function phone_enter(flag, identifier, placeholder) {
                    $(ident+' .select_mask_country').html(flag)
                    $(ident+' .select_mask_code').text(identifier)
                    $(ident+' .phone_input').attr("placeholder", placeholder)
                    resize_input()
                }
                function not_valid(t) {
                    let select_mask = $(ident+' .select-mask')
                    let phone_input = $(ident+' .phone_input')
                    t.val(t.val().replace(/[^0-9 || +]/g, ''))
                    select_mask.css('transition', '0.1s');
                    select_mask.css('background', '#fbcbcb');
                    phone_input.css('transition', '0.1s');
                    phone_input.css('background', '#fbcbcb');
                    setTimeout(function () {
                        select_mask.css('background', 'white')
                        phone_input.css('background', 'white')
                    }, 100)
                }
                $(".copy_button").click(copy_func)
                function init_phone_input(){
                    $(ident+'  .select_mask_country').html(get_flag($(ident+' .phone_select_country').text()))
                    let trigger = $(ident+'  .phone_select_type').text()
                    console.log(ident+'  .phone_select_type')
                    let cc = Object.values(countries).filter(function(i){
                        if(trigger == 'popular'){
                            return i[5]
                        }else {
                            return trigger == 'simple';
                        }
                    })
                    if(cc.length == 0){
                        cc = []
                        JSON.parse($(ident+'  .phone_select_type').text()).forEach(function(i){
                            cc.push(countries[i])
                        })
                    }
                    cc.sort(function (a, b) {
                        if (a < b) {
                            return -1;
                        } else if (a > b) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }).forEach(i => {
                        html_to_append += '<div class="select-mask__item"><div class="select_mask_description">' + get_flag(i[1]) + i[0] + ('+' + i[2]) + '</div><div class="hidden country_flag">' + get_flag(i[1]) + '</div><div class="hidden ident">' + '+' + i[2] + '</div><div class="hidden placeholder">' + (i[3] != undefined ? i[3] : "09812345678") + '</div></div>'
                    })
                    $(ident+' .select-mask__select').append(html_to_append)
                    $(ident+' .select-mask').Emoji()
                    $(ident+' .phone_input').on('input', function (e) {
                        if($(ident+' .phone_input').val().match(/[^0-9 || +]/g) != null) {
                            not_valid($(ident+' .phone_input'))
                        }
                        if ($(ident+' .phone_input').val().split('+').length > 1) {
                            let item = get_country_arr($(ident+' .phone_input').val().replace(/ /g, '').split('+')[1])
                            if (item != undefined) {
                                let placeholder = item[3] != undefined ? item[3] : '09812345678'
                                $(ident+'  .phone_input').val($(ident+' .phone_input').val().split('+' + item[2])[1])
                                phone_enter(emojiParser(get_flag(item[1]), 'https://salebot.pro/images/emoji_picker/apple40/', true, 'emoji', 'png'), '+' + item[2], placeholder)
                            }
                        }
                        let item = countries[$(ident+' .select_mask_code').text().split('+')[1]]
                        let total_count = 0
                        if(item[6] != undefined &&
                            $(ident+' .phone_input').val().length > 1 &&
                            $(ident+' .phone_input').val().startsWith(item[6])){
                            $(ident+' .phone_input').val($(ident+' .phone_input').val().substr(1))
                        }
                        let l = $(ident+' .phone_input').val().replace(/ /g, '').length
                        if (item[4] != undefined) {
                            item[4].forEach(function (i) {
                                total_count += i
                            })
                            if (l <= total_count) {
                                let pat = item[4]
                                let pat_num;
                                if (l < pat[0]) {
                                    pat_num = 1
                                } else if (l < (pat[0] + pat[1])) {
                                    pat_num = 2
                                } else if (l < (pat[0] + pat[1] + pat[2])) {
                                    pat_num = 3
                                } else if (l < (pat[0] + pat[1] + pat[2] + pat[3])) {
                                    pat_num = 4
                                } else if (l < (pat[0] + pat[1] + pat[2] + pat[3] + pat[4])) {
                                    pat_num = 5
                                }
                                if (prev_pat_num < pat_num) {
                                    $(ident+'  .phone_input').val($(ident+' .phone_input').val() + ' ')
                                }
                                prev_pat_num = pat_num
                            } else {
                                total_count += $(ident+' .phone_input').val().split(' ').length - 1
                                $(ident+'  .phone_input').val($(ident+' .phone_input').val().slice(0,total_count))
                                not_valid($(ident+' .phone_input'))
                            }
                        } else {
                            total_count = 13 - $(ident+'  .select_mask_code').text().length
                            if (l > total_count) {
                                total_count += $(ident+' .phone_input').val().split(' ').length - 1
                                $(ident+'  .phone_input').val($(ident+' .phone_input').val().slice(0,total_count))
                                not_valid($(ident+' .phone_input'))
                            }
                        }
                    })
                    $(ident+'  .select-mask__trigger').click(function () {
                        $(ident+' .select-mask__select').show()
                    })
                    $(ident+'  .select-mask__item').click(function () {
                        let flag = $(this).find('.country_flag').html()
                        let ident = $(this).find('.ident').text()
                        let placeholder = $(this).find('.placeholder').text()
                        phone_enter(flag, ident, placeholder)
                    })
                    $(document).mouseup(function (e) {
                        $(ident+' .select-mask__select').hide()
                    })
                    resize_input()
                }
                if($(ident +' .phone_input_container').length > 0){
                    init_phone_input()
                }
            }
            link.href        = `salebot_tilda.css`
            link.rel         = 'stylesheet'
            link.type        = 'text/css'
            link.media       = 'all'
            script2.src      = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
            script2.type     = "text/javascript"
            script2.async    = "async"
            script3.src      = `${domain_with_protocol}/js/emojis.js`
            script3.type     = "text/javascript"
            script3.async    = "async"
            script4.src      = `https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js`
            script4.type     = "text/javascript"
            script4.async    = "async"
            xhr.open('GET', `${domain_with_protocol}/projects/${options.project_id}/tilda_view/${options.guid}${location.search}`, true);
            if(typeof $ == "undefined"){
                document.getElementsByTagName("head")[0].append(script2)
            }else{
                document.getElementsByTagName("head")[0].append(script3)
            }
            script2.onload = function (){
                document.getElementsByTagName("head")[0].append(script3)
            }
            script3.onload = function (){
                document.getElementsByTagName("head")[0].append(script4)
            }
            script4.onload = function (){
                document.getElementsByTagName("head")[0].append(link)
            }
            link.onload = function (){
                xhr.send();
            }
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        if(xhr.responseText.startsWith('{"description":')){
                            let response = JSON.parse(xhr.responseText)
                            return console.log(response.description)
                        }
                        block.innerHTML = xhr.responseText
                        initer("."+identifier)
                        var save_fbp = document.getElementById("save_fbp").innerText == "true";
                        var save_ga = document.getElementById("save_ga").innerText == "true";
                        var save_ym_uid = document.getElementById("save_ym_uid").innerText == "true";
                        var save_roistat_visit = document.getElementById("save_roistat_visit").innerText == "true";
                        var save_comagic = document.getElementById("save_comagic").innerText == "true";
                        // pixels
                        var fb_pixel = document.getElementById("fb_pixel") ? document.getElementById("fb_pixel").innerText : false;
                        var vk_pixel = document.getElementById("vk_pixel") ? document.getElementById("vk_pixel").innerText : false;
                        var comagic_id = document.getElementById("comagic_id") ? document.getElementById("comagic_id").innerText : false;
                        if(comagic_id){
                            $('head').append(`
                                <script type="text/javascript">
                                    var __cs = __cs || [];
                                    __cs.push(["setCsAccount", "${comagic_id}"]);
                                </script>
                                <script type="text/javascript" async src="https://app.comagic.ru/static/cs.min.js"></script>
                            `)
                        }
                        if(fb_pixel){
                            !function (f, b, e, v, n, t, s) {
                                if (f.fbq) return;
                                n = f.fbq = function () {
                                    n.callMethod ?
                                        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                                };
                                if (!f._fbq) f._fbq = n;
                                n.push = n;
                                n.loaded = !0;
                                n.version = '2.0';
                                n.queue = [];
                                t = b.createElement(e);
                                t.async = !0;
                                t.src = v;
                                s = b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t, s)
                            }(window, document, 'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('init', fb_pixel);
                            fbq('track', 'PageView');
                            $(".sb_btn, .btn_new").click(function () {
                                fbq('track', 'Lead');
                            })
                        }
                        if(vk_pixel){
                            var t = document.createElement("script");
                            t.type = "text/javascript";
                            t.async = !0;
                            t.src = "https://vk.com/js/api/openapi.js?168";
                            t.onload = function () {
                                VK.Retargeting.Init(vk_pixel);
                                VK.Retargeting.Hit()
                                VK.Retargeting.Event("View")
                                VK.Goal("view_content")
                            };
                            document.head.appendChild(t)
                            $(".sb_btn, .btn_new").click(function () {
                                VK.Retargeting.Event("Subscribe")
                                VK.Goal("conversion")
                            })
                        }
                        mini_landing_init(save_fbp, save_ga,save_ym_uid,save_roistat_visit, save_comagic)
                    }
                }
            }
        }
    })
    ();
}
