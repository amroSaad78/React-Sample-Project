export class Observer {
  static observe(action, options, target) {
    if (Observer._instance) Observer._instance = undefined;
    Observer._instance = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          await action();
        }
      });
    }, options);
    Observer._instance.observe(target);
  }

  static unobserve(target) {
    if (!Observer._instance) return;
    Observer._instance.unobserve(target);
  }
}
