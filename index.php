<?php
session_start();
$host = $_SERVER['HTTP_HOST'];
$dir = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
?>

<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8" />
        <title>index</title>
    </head>
    <body>
        <h1>>Hello World</h1>
        <p>I'm hosted with GitHub Pages.</p>
        <h4> Provo ad inserire le cose</h4>
        <a href="https://www.google.com/"> Google.com </a>
        <br/>
        <a href="<?php $dir ?>/readme.md"> PHP </a>
        <?php
            $ciao = "Ciao";

            echo $ciao;
            ?>
    </body>
</html>