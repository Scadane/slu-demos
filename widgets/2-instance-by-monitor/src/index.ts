import { Widget, Color, Settings } from "@seelen-ui/lib";

import "./index.css";

const widget = await Widget.getCurrentAsync();
const { webview } = widget;

// configure the webview window
webview.setDecorations(false);
webview.setShadow(false);

// set as desktop background widget, (background widgets won't appear on the seelen dock)
webview.setAlwaysOnBottom(true);

// whe using replica by monitor, all replicas will have a monitorId param.
console.debug(`Hello world from monitor: ${widget.decoded.monitorId}`);

// playing with the DOM step.
{
  const root = document.getElementById("root")!;

  root.className = "example";

  const bg = Color.random();
  bg.inner.a = 200;

  root.style.backgroundColor = bg.toHexString();
  root.style.color = bg.calcLuminance() > 128 ? "black" : "white";
  root.style.borderColor = Color.random().toHexString();

  root.innerHTML = `<h1>Hello world from monitor: ${widget.decoded.monitorId}</h1>`;

  // In case of use of settings, this are patched automatically,
  // so users can have different settings for each monitor replica
  const settings = await Settings.getAsync();
  const config = await settings.getCurrentWidgetConfig();
  root.innerHTML += `<p>Test Content: <b id="testContent">${config.testContent}</b></p>`;
  // remember adding a listener to Settings.onChange to get the new setting values whe user changes them
  await Settings.onChange(async (newSettings) => {
    const config = await newSettings.getCurrentWidgetConfig();
    document.getElementById("testContent")!.innerHTML = String(config.testContent);
  });
}

// show the widget
webview.show();
