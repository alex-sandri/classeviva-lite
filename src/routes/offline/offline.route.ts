import * as pizza from "@alex-sandri/pizza-utilities";

pizza.ServiceWorker.register();

pizza.ServiceWorker.listen("updateready", pizza.ServiceWorker.update);
