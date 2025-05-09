fetch('/main page/navbar.html')
      .then(response => response.text())
      .then(data => {
        document.querySelector('.navbar').innerHTML = data;
      });