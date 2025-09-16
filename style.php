<?php
$data = json_decode(file_get_contents("data.json"), true);
$design = $data['design'];
header("Content-Type: text/css; charset=UTF-8");
?>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: <?= $design['background'] ?>;
  color: <?= $design['text'] ?>;
  direction: rtl;
  text-align: right;
}
header {
  background: <?= $design['header'] ?>;
  padding: 20px;
  text-align: center;
  color: <?= $design['button'] ?>;
}
nav a {
  color: <?= $design['text'] ?>;
  margin: 0 10px;
  text-decoration: none;
}
nav a:hover { color: <?= $design['button'] ?>; }
section {
  padding: 40px;
  border-bottom: 1px solid #333;
}
button, .btn {
  background: <?= $design['button'] ?>;
  border: none;
  padding: 10px 20px;
  color: #111;
  cursor: pointer;
  border-radius: 5px;
}
footer {
  background: <?= $design['footer'] ?>;
  text-align: center;
  padding: 20px;
  color: <?= $design['text'] ?>;
}
footer a {
  color: <?= $design['button'] ?>;
  text-decoration: none;
}
footer a:hover { color: #fff; }
