<html>

<head>
    <meta charset="utf-8">
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
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="../font-awesome/css/font-awesome.min.css">

</head>


<body>
    <div id="app" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices.min.js"></script>
    <script src="../public/bundle.js" type="text/javascript"></script>
    <script>
        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (searchString, position) {
                return this.substr(position || 0, searchString.length) === searchString;
            };
        }
    </script>
</body>

</html>