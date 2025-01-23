import { $activity, Activity, app, ui } from "talla-ui";
import { CountAPI } from "./CountAPI";

const view = ui.cell(
  ui.label($activity("count"), {
    style: { fontSize: 40, tabularNums: true },
  }),
  ui.button({
    icon: ui.icon.PLUS,
    accessibleLabel: "Increment counter",
    onClick: "CountUp",
    style: ui.style.BUTTON_SUCCESS,
  })
);

export class MainActivity extends Activity {
  countAPI = new CountAPI();

  protected async beforeActiveAsync() {
    this.count = await this.countAPI.getCountAsync();
  }

  createView() {
    return view.create();
  }

  count = 0;
  onCountUp() {
    this.count++;
    this._queue.addOrReplace("post", () =>
      this.countAPI.updateCountAsync(this.count)
    );
  }

  private _queue = this.createActiveTaskQueue();
}

// hot reload for vite:
if (import.meta.hot) {
  import.meta.hot.accept();
  app.hotReload(import.meta, MainActivity);
}
