<?php
session_start();
$correct_password = "1997";

if (!isset($_SESSION['logged_in'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['password'] === $correct_password) {
        $_SESSION['logged_in'] = true;
    } else {
        echo '<form method="post"><h2>تسجيل الدخول</h2><input type="password" name="password" placeholder="كلمة المرور"><button type="submit">دخول</button></form>';
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save'])) {
    $data = json_decode(file_get_contents("data.json"), true);
    foreach (['features','products','offers','about','reviews','news'] as $field) {
        if (isset($_POST[$field])) {
            $lines = explode("\n", $_POST[$field]);
            $data[$field] = array_map('trim', $lines);
        }
    }
    if (!empty($_FILES['gallery']['name'][0])) {
        foreach ($_FILES['gallery']['name'] as $i => $name) {
            $tmp = $_FILES['gallery']['tmp_name'][$i];
            $target = "uploads/" . basename($name);
            move_uploaded_file($tmp, $target);
            $data['gallery'][] = basename($name);
        }
    }
    if (isset($_POST['mode'])) $data['design']['mode'] = $_POST['mode'];
    if (isset($_POST['background'])) $data['design']['background'] = $_POST['background'];
    if (isset($_POST['text'])) $data['design']['text'] = $_POST['text'];
    if (isset($_POST['button'])) $data['design']['button'] = $_POST['button'];
    if (isset($_POST['header'])) $data['design']['header'] = $_POST['header'];
    if (isset($_POST['footer'])) $data['design']['footer'] = $_POST['footer'];
    file_put_contents("data.json", json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    echo "<p>تم تحديث البيانات بنجاح!</p>";
}
$data = json_decode(file_get_contents("data.json"), true);
?>
<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <title>لوحة التحكم</title>
</head>
<body>
  <h1>لوحة التحكم</h1>
  <form method="post" enctype="multipart/form-data">
    <h2>المميزات</h2>
    <textarea name="features" rows="4" cols="50"><?php echo implode("\n", $data['features']); ?></textarea>

    <h2>المنتجات</h2>
    <textarea name="products" rows="4" cols="50"><?php echo implode("\n", $data['products']); ?></textarea>

    <h2>العروض</h2>
    <textarea name="offers" rows="4" cols="50"><?php echo implode("\n", $data['offers']); ?></textarea>

    <h2>عن الشركة</h2>
    <textarea name="about" rows="4" cols="50"><?php echo $data['about']; ?></textarea>

    <h2>التقييمات</h2>
    <textarea name="reviews" rows="4" cols="50"><?php echo implode("\n", $data['reviews']); ?></textarea>

    <h2>الأخبار</h2>
    <textarea name="news" rows="4" cols="50"><?php echo implode("\n", $data['news']); ?></textarea>

    <h2>المعرض (رفع صور)</h2>
    <input type="file" name="gallery[]" multiple>

    <h2>إعدادات التصميم</h2>
    <label>الوضع:</label>
    <select name="mode">
      <option value="dark" <?php if($data['design']['mode']=="dark") echo "selected"; ?>>غامق</option>
      <option value="light" <?php if($data['design']['mode']=="light") echo "selected"; ?>>فاتح</option>
    </select><br>
    <label>خلفية:</label><input type="color" name="background" value="<?php echo $data['design']['background']; ?>"><br>
    <label>نصوص:</label><input type="color" name="text" value="<?php echo $data['design']['text']; ?>"><br>
    <label>أزرار:</label><input type="color" name="button" value="<?php echo $data['design']['button']; ?>"><br>
    <label>هيدر:</label><input type="color" name="header" value="<?php echo $data['design']['header']; ?>"><br>
    <label>فوتر:</label><input type="color" name="footer" value="<?php echo $data['design']['footer']; ?>"><br>

    <br><button type="submit" name="save">حفظ التغييرات</button>
  </form>
</body>
</html>
