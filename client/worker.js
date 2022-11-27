self.addEventListener("push", e => {
    const data = e.data.json();
    self.registration.showNotification(
        data.title, // title of the notification
        {
            body: "Push notification from section.io", //the body of the push notification
            // image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fbell_1827272&psig=AOvVaw1nEi3Yc5h6JNMzaQd2c_O4&ust=1669633201420000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPCtt8KazvsCFQAAAAAdAAAAABAD",
            // icon: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fbell_1827272&psig=AOvVaw1nEi3Yc5h6JNMzaQd2c_O4&ust=1669633201420000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPCtt8KazvsCFQAAAAAdAAAAABAD" // icon 
        }
    );
});