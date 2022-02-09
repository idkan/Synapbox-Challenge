'use strict';

/**
 * Required External Modules
 */
import express, { json, urlencoded } from 'express';
import treeRoute from './routes/tree.js';

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || 3000;

/**
 * Middleware Setup
 */
app.use(json({ limit: '30mb', extended: true }));
app.use(urlencoded({ limit: '30mb', extended: true }));

/**
 * Routes Definitions
 */
app.use('/api/tree', treeRoute);

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});