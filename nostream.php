<html>
    <head>
        <link rel="stylesheet" type="text/css" title="default" href="css/default.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    </head>
    <body class="noStream">
        <?php
        $file = 'motd.txt';
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            if($_POST['newMOTD'] != null || $_POST['newMOTD'] === ''){
                $text = trim($_POST['newMOTD']);
                $text = stripslashes($text);
                $text = htmlspecialchars($text);
                file_put_contents($file, $text);
            }
        }
        $motd = file_get_contents($file);
        ?>

        <div id="scContainer">
            <p><span id="letterS">Sekrit</span><span id="letterC">Club</span></p>
        </div>
        <div class="motdBox">
            <p class="motdText"><span class="messageBoard1">Message</span> <span class="messageBoard2">Board</span> </br></br><?php echo nl2br($motd); ?></p>
            <form method="post" class="motdForm">
                <label class="motdLabel">Edit MOTD: </label>
                <textarea name="newMOTD" placeholder="Enter new MOTD here..."><?php echo $motd ?></textarea>
                <input class="motdSubmit" type="submit" value="Submit">
            </form>
        </div>
    </body>
</html>