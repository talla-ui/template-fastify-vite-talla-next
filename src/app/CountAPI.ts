export class CountAPI {
  async getCountAsync() {
    let req = await fetch("/api/count");
    let { count } = (await req.json()) as { count: number };
    return count;
  }

  async updateCountAsync(count: number) {
    await fetch("/api/count", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count }),
    });
  }
}
