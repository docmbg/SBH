<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible"  content="IE=edge">
        <title>Site Builder</title>
        <link rel="stylesheet" href="../styles.css">
        <link rel="stylesheet" href="../react-resize.css">
        <link rel="stylesheet" href="../react-resizeable.css">
        <link rel="stylesheet" href="../editorStyles.css">
        <link rel="stylesheet" href="../react-draft-wysiwyg.css">
        <link rel="stylesheet" href="../custom-list-points.css">
        <link rel="stylesheet" href="../materialize-tabs.css">
        <link rel="stylesheet" href="../calendar.css">
        <link rel="stylesheet" href="../image-modal-popup.css">
        <link rel="stylesheet" href="../horizontalNav.css">
        <link rel="stylesheet" href="../buttonsBar.css">
        <link rel="stylesheet" href="../tabularMenu.css">
        <link rel="stylesheet" href="../image-gallery-style.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="../font-awesome/css/font-awesome.min.css">

</head>


<body>
    <div id="app" />
    <script>
        if (!String.prototype.endsWith) {
            String.prototype.endsWith = function (search, this_len) {
                if (this_len === undefined || this_len > this.length) {
                    this_len = this.length;
                }
                return this.substring(this_len - search.length, this_len) === search;
            };
        }
        if (!Array.prototype.includes) {
            Object.defineProperty(Array.prototype, 'includes', {
                value: function (searchElement, fromIndex) {

                    if (this == null) {
                        throw new TypeError('"this" is null or not defined');
                    }

                    // 1. Let O be ? ToObject(this value).
                    var o = Object(this);

                    // 2. Let len be ? ToLength(? Get(O, "length")).
                    var len = o.length >>> 0;

                    // 3. If len is 0, return false.
                    if (len === 0) {
                        return false;
                    }

                    // 4. Let n be ? ToInteger(fromIndex).
                    //    (If fromIndex is undefined, this step produces the value 0.)
                    var n = fromIndex | 0;

                    // 5. If n ≥ 0, then
                    //  a. Let k be n.
                    // 6. Else n < 0,
                    //  a. Let k be len + n.
                    //  b. If k < 0, let k be 0.
                    var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                    function sameValueZero(x, y) {
                        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
                    }

                    // 7. Repeat, while k < len
                    while (k < len) {
                        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                        // b. If SameValueZero(searchElement, elementK) is true, return true.
                        if (sameValueZero(o[k], searchElement)) {
                            return true;
                        }
                        // c. Increase k by 1. 
                        k++;
                    }

                    // 8. Return false
                    return false;
                }
            });
        }
        if (!Array.prototype.find) {
            Object.defineProperty(Array.prototype, 'find', {
                value: function (predicate) {
                    // 1. Let O be ? ToObject(this value).
                    if (this == null) {
                        throw new TypeError('"this" is null or not defined');
                    }

                    var o = Object(this);

                    // 2. Let len be ? ToLength(? Get(O, "length")).
                    var len = o.length >>> 0;

                    // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                    if (typeof predicate !== 'function') {
                        throw new TypeError('predicate must be a function');
                    }

                    // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    var thisArg = arguments[1];

                    // 5. Let k be 0.
                    var k = 0;

                    // 6. Repeat, while k < len
                    while (k < len) {
                        // a. Let Pk be ! ToString(k).
                        // b. Let kValue be ? Get(O, Pk).
                        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                        // d. If testResult is true, return kValue.
                        var kValue = o[k];
                        if (predicate.call(thisArg, kValue, k, o)) {
                            return kValue;
                        }
                        // e. Increase k by 1.
                        k++;
                    }

                    // 7. Return undefined.
                    return undefined;
                }
            });
        }
        if (!Array.prototype.fill) {
            Object.defineProperty(Array.prototype, 'fill', {
                value: function (value) {

                    // Steps 1-2.
                    if (this == null) {
                        throw new TypeError('this is null or not defined');
                    }

                    var O = Object(this);

                    // Steps 3-5.
                    var len = O.length >>> 0;

                    // Steps 6-7.
                    var start = arguments[1];
                    var relativeStart = start >> 0;

                    // Step 8.
                    var k = relativeStart < 0 ?
                        Math.max(len + relativeStart, 0) :
                        Math.min(relativeStart, len);

                    // Steps 9-10.
                    var end = arguments[2];
                    var relativeEnd = end === undefined ?
                        len : end >> 0;

                    // Step 11.
                    var final = relativeEnd < 0 ?
                        Math.max(len + relativeEnd, 0) :
                        Math.min(relativeEnd, len);

                    // Step 12.
                    while (k < final) {
                        O[k] = value;
                        k++;
                    }

                    // Step 13.
                    return O;
                }
            });
        }
        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (searchString, position) {
                return this.substr(position || 0, searchString.length) === searchString;
            };
        }
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices.min.js"></script>
    <script src="../public/bundle.js" type="text/javascript"></script>

</body>

</html>