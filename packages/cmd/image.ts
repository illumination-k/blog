import fs from "fs";
import path from "path";
import util from "util";

import { z } from "zod";

function symmetricDifference<T>(setA: Set<T>, setB: Set<T>) {
  let _difference = new Set(setA);

  setB.forEach((elem) => {
    if (_difference.has(elem)) {
      _difference.delete(elem);
    } else {
      _difference.add(elem);
    }
  });

  return _difference;
}

const imageLockObjectSchema = z.object({
  postUuid: z.string().uuid(),
  imagePath: z.string(),
});

type ImageLockObject = z.infer<typeof imageLockObjectSchema>;

function toWebPath(o: ImageLockObject) {
  const filename = path.basename(o.imagePath);
  return path.join(o.postUuid, filename);
}

// remove unused images
// create new images
function diffImageLockObjects(prev: ImageLockObject[], cur: ImageLockObject[]) {
  const prevSet = new Set(prev);
  const curSet = new Set(cur);

  const removeImageObjects = symmetricDifference(prevSet, curSet);
  const copyImageObjects = symmetricDifference(curSet, prevSet);

  return { removeImageObjects, copyImageObjects };
}

async function removeImages(imageLockObjects: Set<ImageLockObject>) {
  const unlinkAsync = util.promisify(fs.unlink);
  await Promise.all(
    Array.from(imageLockObjects)
      .map(async (o) => await unlinkAsync(o.imagePath)),
  );
}

async function copyImages(imageLockObjects: Set<ImageLockObject>) {
  const copyAsync = util.promisify(fs.copyFile);
  await Promise.all(
    Array.from(imageLockObjects)
      .map(async (o) => await copyAsync(o.imagePath, toWebPath(o))),
  );
}
