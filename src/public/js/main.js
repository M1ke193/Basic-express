function loadNewAvatar(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const newAvatarSrc = e.target.result;
        document.getElementsByClassName('image')[0].src = newAvatarSrc;
    }

    reader.readAsDataURL(file);
}