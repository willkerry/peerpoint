from locust import HttpUser, task
from nanoid import generate


class LoadTesting(HttpUser):
    wait_time = 20
    cookie = generate()

    @task
    def hello_world(self):
        self.client.post("http://localhost:3000/api/execute/20", json={
            "language": 84,
            "userCode": "Module HelloWorld\n    Sub Main( )\n       System.Console.WriteLine(\"Hello World\")\n    End Sub\n End Module"},
            headers={
            "Cookie": "pp-client-cookie:{}".format(self.cookie)
        })
