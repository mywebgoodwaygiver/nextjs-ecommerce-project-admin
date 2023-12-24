import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({_id:req.query.id}));
    } else {
      res.json(await Product.find());
    }
  }
try {
   if (method === 'POST') {
    const {title,description,price,images,properties} = req.body;
    const productDoc = await Product.create({
      title,description,price,images,properties,
    })
    res.json(productDoc);
  }
} catch (error) {
  console.log("error: 💗💗💗💗💗💗💗💗💗💗💗", error)
}
 

  if (method === 'PUT') {
    const {title,description,price,images,properties,_id} = req.body;
    await Product.updateOne({_id}, {title,description,price,images,properties});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}