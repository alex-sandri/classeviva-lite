import * as pizza from "@alex-sandri/pizza-utilities";
import { ClasseViva } from "@alex-sandri/classeviva-api";

pizza.ServiceWorker.register();

pizza.ServiceWorker.listen("updateready", pizza.ServiceWorker.update);
