import { Router } from 'express';
import { register } from "./list.route";

export function registerRoutes(router: Router) {
  // @ts-ignore
  register(router);
}

