import * as PIXI from 'pixi.js';
import { Resource } from 'resource-loader';
// import readGbo from './readGbo';
import readGbo from './read-gbo';

PIXI.geometryCache = PIXI.geometryCache || {};

export default function ()
{
    return function gboLoader(resource, next)
    {
        if (resource.data && resource.extension === 'gbo')
        {
            const arrayBuffer = resource.data; // Note: not oReq.responseText

            readGbo(arrayBuffer).then((o) =>
            {
                const geometry = new PIXI.Geometry()
                    .addAttribute('uvs', o.uv, 2)
                    .addAttribute('position', o.position, 3)
                    .addAttribute('normals', o.normals, 3)
                    .addIndex(new Uint16Array(o.indices));

                resource.geometry = geometry;                
                PIXI.geometryCache[`${resource.url.slice(0, -3)}obj`] = geometry;
                PIXI.geometryCache[resource.url] = geometry;

                next();
            });
        }
        else
        {
            next();
        }
    };
}
