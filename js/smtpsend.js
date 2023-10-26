
  function emailSend() {
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "ayush17095023@gmail.com",
      Password: "22A7C1A9FA6E591F3FA0141994F378B778FA",
      To: "singhayush05497@gmail.com",
      From: "ayush17095023@gmail.com",
      Subject: "This is the subject",
      Body: "And this is the body"
    }).then(
      message => alert(message)
    );
  }
