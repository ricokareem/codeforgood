import { GlobalRegistrator } from "@happy-dom/global-registrator";

// Register happy-dom globals (window, document, etc.)
GlobalRegistrator.register();

// Mock Audio constructor (used in projects component)
class MockAudio {
  volume = 1;
  currentTime = 0;
  play() {
    return Promise.resolve();
  }
  remove() {}
}
(globalThis as any).Audio = MockAudio;
