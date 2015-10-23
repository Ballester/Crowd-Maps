<?php

  function random_pic($dir = 'images')
  {
    $files = glob($dir . '/*.*');
    $file = array_rand($files);
    return $files[$file];
  }
echo random_pic()

?>
