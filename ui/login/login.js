async function login(event) {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const user = {
        userId: formData.get("userId"),
        password: formData.get("password")
    }
    const response = await fetch(`http://localhost:8080/login`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    const sessionData = new Array();
    sessionData.push(user.userId, await response.text())
    $.cookie("sessionData", sessionData, {domain: "127.0.0.1", path: "/", expires: 1})

    check(sessionData);
}

async function check(sessionData){
    const response = await fetch(`http://localhost:8080/login/check/${sessionData[0]}/${sessionData[1]}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    if(!response.ok) {
        console.error(await response.json());
        console.log("error")
        document.getElementById("messageBox").innerHTML = "ログイン失敗"
        setTimeout("deleteMessage()", 1500);
    } else {
        console.log("OK")
        location.href = `http://125.26.15.242:9005/th/Home`
    }
}

function deleteMessage() {
    document.getElementById("messageBox").innerHTML = ""
}