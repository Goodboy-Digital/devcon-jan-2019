const path = require('path');
const build = require('@goodboydigital/fido-build');

const args = {};

const config = {

    output: {
        path: path.join(process.cwd(), './dist'),
        filename: 'app.js',
    },

    resolve: {
        alias: {
            'pixi.js': path.join(process.cwd(), './src/scripts/lib/pixi.js'),
        },
    },
};

const links = [
    { location: '../../Projects/odie/lib', target: './node_modules/@goodboydigital/odie/lib/' },
    { location: '../../../Projects/pixi.js/bundles/pixi.js/dist', target: './src/scripts/lib' }];

process.argv.forEach((val) =>
{
    args[val] = true;
});

if (args.production)
{
    try
    {
        if (args.js)
        {
            build.compileProductionCode(config);
        }
        else
        {
            build.startupProduction(config);
        }
    }
    catch (e)
    {
        throw new Error(`production build has failed${e}`);
    }
}
else if (args.assets)
{
    build.compileProductionAsset();
}
else
{
    build.startupDevelopment(config, links, {});
}
