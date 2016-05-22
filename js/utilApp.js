/**
 * Created by charlesdaniel on 5/12/16.
 */
"use strict";

angular.module('UtilFilter', [])

    .filter('subtext', [function () {
        return function (text, start, end) {
            if (start === undefined)
                start = 0;
            if (end === undefined)
                end = 1;
            return String(text).substring(start,end);
        };
    }])
    .filter('yesno', [function () {  //check if value is equal to true (or yes value) and return yes (or yeslabel)
        return function (value, yeslabel, nolabel, yesvalue) {
            if (!yeslabel)
                yeslabel = 'Yes';
            if (!nolabel)
                nolabel = 'No';
            if (yesvalue=== undefined)
                yesvalue=true;
            var retlabel=(value==yesvalue) ? yeslabel : nolabel;
            return retlabel;
        };
    }])
    .filter('makeBoolean', [function () {  //check if value is passed in true value and return true
        return function (value, truevalue) {
            if (angular.isString(value))
                value=value.toLowerCase();
            if (angular.isString(truevalue))
                truevalue=truevalue.toLowerCase();
            if (truevalue=== undefined)
                truevalue="true";
            var retvalue=(value==truevalue || value==1 || value===true) ?  true: false ;
            return retvalue;
        };
    }])
    .filter('unsafe', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }])
    .filter('title', [function() {
        return function(str) {
            if (!str) return '';
            return str.replace(/\b./g, function (m) { return m.toUpperCase(); });
        };
    }])
    .filter('initials', [function() {
        return function(str) {
            if (!str) return '';
            return str.split(' ').map(function(s) { return s.charAt(0).toUpperCase(); }).join('');
        };
    }])
    .filter('default', [function() {
        return function(str, val) {
            if (!str) return val;
            return str;
        };
    }])
    .filter('pluralize', [function() {
        return function(str, options) {
            var options = options || {};
            if (typeof options.count !== 'undefined' && options.count < 2) return str;
            return str + (options.suffix || 's');
        }
    }])
    .filter('ellipsis', [function() {
        return function(str,length) {
            if (!str) return '';
            var temp = str.substr(0,length);
            if(str.length > length) return temp + '...';
            return str;
        }
    }])
    .filter('nl2br', [function() {
        return function(text) {
            return text.replace(/\n/g, '<br/>');
        }
    }])
    .filter('nw2br', [function() {
        return function(text) {
            return text.replace(/\s/g, '<br/>');
        }
    }])
    .filter('toArray', [function() {
        return function(length) {
            return Array.apply(null, Array(length)).map(function(el, i) { return i; });
        }
    }])
    .filter('keys', [function() {
        return function(obj) {
            return Object.keys(obj);
        }
    }])
    .filter('uniq', [function() {
        return function (arr, field) {
            return _.uniq(arr, function(a) { return a[field]; });
        };
    }])
    .filter('ordinalSuffix', [function() {
        return function(i) {
            if (!i) return '';
            var j = i % 10, k = i % 100;
            if (j == 1 && k != 11) return i + "st";
            if (j == 2 && k != 12) return i + "nd";
            if (j == 3 && k != 13) return i + "rd";
            return i + "th";
        };
    }])
    // This make suffix to date (confirm with rich)
    .filter('dateSuffix', function($filter) {
        var suffixes = ["th", "st", "nd", "rd"];
        return function(input) {
            if (!input) return '';
            var dtfilter = $filter('date')(input, 'EEE, MMM dd');
            var day = parseInt(dtfilter.slice(-2));
            var relevantDigits = (day < 30) ? day % 20 : day % 30;
            var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
            return dtfilter+suffix;
        };
    })
    //This makes the first letter uppercase and rest lowercase
    .filter('capitalize', function() {
        return function(input, scope) {
            if (input!=null)
                input = input.toLowerCase();
            return input.substring(0,1).toUpperCase()+input.substring(1);
        }
    })

    .filter('cabinClass', function() {
        return function(cabin) {
            switch (cabin.toLowerCase()) {
                case 'economic standard': return 'Economy';
                default: return cabin;
            }
        }
    })

    //This convert the time string to text 24hr
    .filter('allday', function() {
        return function(input) {
            if (input!=null)
                if (input == '12:01 am - 12:00 am') return '24hr';
            return input;
        }
    })

    //This convert a time in string format to 12 hr format
    .filter('toTime', function($filter) {
        return function(input) {
            var time = input.split(':');
            var date = new Date().setHours(time[0],time[1]);
            return moment(date).format('h:mm a');
        };
    })

    //This convert passenger type code to name
    .filter('passType', function($filter) {
        return function(input) {
            switch (input){
                case 'ADT': return "Adult";
                case 'CHD': return "Child";
                case 'INF': return "Infant on lap";
                case 'INS': return "Infant in seat";
                default : break;
            }
        };
    })

    .filter('gteDate', function() {
        return function(arr, prop) {
            return arr.filter(function(el) {
                return new Date(el[prop]) >= new Date()
            });
        };
    })

    .filter('multiCurrency', ['$filter',function ($filter) {
        return function(priceData) {
            var displayPrice = $filter('price')(priceData[0].price || priceData[0].cost , priceData[0].currencyCode,2);
            if (priceData.length > 1)
                displayPrice += " (" + $filter('price')(priceData[1].price || priceData[1].cost, priceData[1].currencyCode,2) + ")";
            return displayPrice;
        }
    }])

    .filter('wikiMarkup', ['nl2brFilter', function(nl2brFilter) {
        function list(markup, depth) {
            var depth = depth || 3;
            var typeObj = {ul:'*', ol:'#'};

            for (var tag in typeObj) {
                var symbol = typeObj[tag];

                for (var j=depth; j>0; j--) {
                    var symbolStr = Array(j+1).join(typeObj[tag]);
                    var regex = new RegExp('\\' + symbol + '{' + j + '}([\\s\\S]*?)\\n\\n', 'gi');

                    markup = markup.replace(regex, function($0, str) {
                        var items = str.split(symbolStr).map(function(li) { return li.trim(); });
                        if (items.length) return '<' + tag + '>' + items.reduce(function(prev, curr) { return prev + '<li>' + curr + '</li>' }, '') + '</' + tag + '>';
                        return '';
                    });
                }
            }

            return markup;
        }

        return function(markup) {
            if (markup == undefined) return undefined;
            markup = markup.trim();
            markup = markup.replace(/'{5}(.*)'{5}/gi, '<strong><em>$1</em></strong>');
            markup = markup.replace(/'{3}(.*)'{3}/gi, '<strong>$1</strong>');
            markup = markup.replace(/'{2}(.*)'{2}/gi, '<em>$1</em>');
            markup = markup.replace(/={2}(.*)={2}/gi, '<h2>$1</h2>');
            markup = markup.replace(/={3}(.*)={3}/gi, '<h3>$1</h3>');
            markup = markup.replace(/={4}(.*)={4}/gi, '<h4>$1</h4>');
            markup = markup.replace(/={5}(.*)={5}/gi, '<h5>$1</h5>');
            markup = markup.replace(/={6}(.*)={6}/gi, '<h6>$1</h6>');

            // Remove tables for now
            markup = markup.replace(/\{\|([\s\S]*?)(wikitable)([\s\S]*?)\|\}/gi, function() {
                return '';
            });

            // Remove images and files
            markup = markup.replace(/\[{2}(image|file):([\s\S]*?)\]{2}/gi, function($0, str) {
                return '';
            });

            // "Region" Templates
            markup = markup.replace(/\{{2}Regionlist([\s\S]*?)\}{2}/gi, function($0, str) {
                var i = 1;
                var html = '';
                var attrs = {};

                str.split('\n|').forEach(function(x) {
                    var arr = x.trim().split('=');
                    arr[1] && (attrs[arr[0]] = arr[1]);
                });

                do {
                    html += attrs['region' + i + 'name'] + '<br/>';
                    html += (attrs['region' + i + 'description'] || '')  + '<br/><br/>';
                } while (attrs['region' + (++i) + 'name'])

                return html;
            });

            // "Do|See|Eat|Sleep" Templates
            // markup = markup.replace(/\{{2}(?:do|buy|connect|drink|see|eat|sleep|listing)([\s\S]*?)\}{2}/gi, function($0, str) {
            markup = markup.replace(/\{{2}.*?\n\|([\s\S]*?)\}{2}/gi, function($0, str) {
                var attrs = {};
                str.split('|').forEach(function(x) {
                    var arr = x.trim().split('=');
                    arr[1] && (attrs[arr[0]] = arr[1]);
                });

                //Removing external links from app
                //if (attrs.url && attrs.name) return '<a href="' + attrs.url + '" target="_blank">' + attrs.name + '</a>';
                if (attrs.name) return attrs.name;
                return '';
            });

            // Internal links with optional name
            markup = markup.replace(/\[{2}([\s\S]*?)\]{2}/gi, function($0, str) {
                var parts = str.split(/[\|]+/).map(function(p) { return p.trim(); });
                var url = parts[0];
                var name = parts.splice(1).join(' ') || url;

                if (url.indexOf('file') == 0 || url.indexOf('image') == 0) return '';
                // return '<a href="http://wikivoyage.org/wiki/' + url + '" target="_blank">' + name + '</a>';


                if (url.indexOf("'") >= 0) {
                    url = url.replaceAll("'","\\'");
                }
                if (url.indexOf('"') >= 0) {
                    url = url.replaceAll('"','\\"');
                }
                return '<a href="" ng-click="link(\'' + url + '\')">' + name + '</a>';

            });

            // External links with optional name
            markup = markup.replace(/\[{1}([\s\S]*?)\]{1}/gi, function($0, str) {
                str = str.replace(/(http\|)/gi, 'http:');
                var parts = str.split(/[\s]+/).map(function(p) { return p.trim(); });
                var url = parts[0];
                var name = parts.splice(1).join(' ') || url;
                //uncomment following line to enable back external link creation
                //return '<a href="' + url + '" target="_blank">' + name + '</a>';
                //return just text
                return name;
            });

            // List
            markup = list(markup);

            // Cleanup
            markup = markup.replace(/#redirect/gi, '');
            markup = markup.replace(/\{{2}[\s\S]*\}{2}/gi, '');
            markup = markup.replace(/\[{2}[\s\S]*\]{2}/gi, '');
            markup = markup.replace(/\{\{/gi, '');
            markup = markup.replace(/\}\}/gi, '');
            markup = markup.replace(/\[\[/gi, '');
            markup = markup.replace(/\]\]/gi, '');
            markup = markup.trim();
            if (['(', ')', '[', ']', '{', '}'].indexOf(markup.charAt(0)) > -1) markup = markup.substring(1);
            if (['(', ')', '[', ']', '{', '}'].indexOf(markup.charAt(markup.length-1)) > -1) markup = markup.substring(0, markup.length-1);
            markup = markup.trim();

            return markup;
        };
    }])
;