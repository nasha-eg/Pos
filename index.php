<?php
$data = json_decode(file_get_contents("data.json"), true);
?>
<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>نوار مصر للفحم والتصدير</title>
  <link rel="stylesheet" href="style.php">
</head>
<body>
  <header>
    <h1>نوار مصر للفحم والتصدير</h1>
    <nav>
      <a href="#features">المميزات</a>
      <a href="#products">المنتجات</a>
      <a href="#offers">العروض</a>
      <a href="#gallery">المعرض</a>
      <a href="#about">من نحن</a>
      <a href="#reviews">التقييمات</a>
      <a href="#news">الأخبار</a>
      <a href="#contact">تواصل معنا</a>
    </nav>
  </header>

  <section id="features">
    <h2>المميزات</h2>
    <ul>
      <?php foreach($data['features'] as $f): ?>
        <li><?= htmlspecialchars($f) ?></li>
      <?php endforeach; ?>
    </ul>
  </section>

  <section id="products">
    <h2>المنتجات</h2>
    <ul>
      <?php foreach($data['products'] as $p): ?>
        <li><?= htmlspecialchars($p) ?></li>
      <?php endforeach; ?>
    </ul>
  </section>

  <section id="offers">
    <h2>العروض</h2>
    <ul>
      <?php foreach($data['offers'] as $o): ?>
        <li><?= htmlspecialchars($o) ?></li>
      <?php endforeach; ?>
    </ul>
  </section>

  <section id="gallery">
    <h2>المعرض</h2>
    <?php foreach($data['gallery'] as $g): ?>
      <img src="uploads/<?= htmlspecialchars($g) ?>" alt="صورة" style="width:150px;margin:5px;">
    <?php endforeach; ?>
  </section>

  <section id="about">
    <h2>من نحن</h2>
    <p><?= htmlspecialchars($data['about']) ?></p>
  </section>

  <section id="reviews">
    <h2>التقييمات</h2>
    <ul>
      <?php foreach($data['reviews'] as $r): ?>
        <li><?= htmlspecialchars($r) ?></li>
      <?php endforeach; ?>
    </ul>
  </section>

  <section id="news">
    <h2>الأخبار</h2>
    <ul>
      <?php foreach($data['news'] as $n): ?>
        <li><?= htmlspecialchars($n) ?></li>
      <?php endforeach; ?>
    </ul>
  </section>

  <section id="contact">
    <h2>تواصل معنا</h2>
    <a class="btn" href="https://wa.me/201090603399" target="_blank">تواصل عبر واتساب</a>
    <div id="map" style="margin-top:20px;">
      <iframe width="100%" height="300" 
        src="https://www.openstreetmap.org/export/embed.html?bbox=31.704437%2C31.432353%2C31.724437%2C31.452353&layer=mapnik&marker=31.442353%2C31.714437">
      </iframe>
    </div>
  </section>

  <footer>
    <p>جميع الحقوق محفوظة © 2025 نوار مصر للفحم والتصدير</p>
    <p>حقوق الملكية الفكرية والطبع والنشر <a href="https://wa.me/201000251645" target="_blank">Social Brand Space</a></p>
  </footer>
</body>
</html>
