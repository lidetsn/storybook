const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../../middleware/auth')

const Story = require('../../model/Story')
const User = require('../../model/User')


// @desc    Dashboard
// @route   GET /userStory
router.get('/userStory',  async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).sort({ createdAt: 'desc' })
       res.json(stories)
  } catch (err) {
    console.error(err)
    res.json({msg:"something went wrong"})
  }
})
// @desc    Process add form
// @route   POST /stories
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Story.create(req.body)
    res.json({msg:"success"})
    
  } catch (err) {
    console.error(err)
    res.json({msg:"something went wrong"})
    // res.render('error/500')
  }
})

// @desc    Show all stories
// @route   GET /stories
router.get('/',  async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
                                .populate('user')
                                .sort({ createdAt: 'desc' })
                                .lean()


                     res.json(stories)
    // res.render('stories/index', {
    //   stories,
    // })
  } catch (err) {
    console.error(err)
    
    // res.render('error/500')
  }
})

// @desc    Show single story
// @route   GET /stories/:id
router.get('/:id', async (req, res) => {
  console.log(req.params.id)
  console.log("====id-----")
  try {
    // let story = await Story.findById(req.params.id).populate('user').lean()
    let story = await Story.findById(req.params.id)
    let user=await User.findById(story.user)
    

    if (!story) {
     // return res.render('error/404')
      return res.json({msg:"no such story to show"})
    }

    if (story.user._id != req.user.id && story.status == 'private') {
     // res.render('error/404')
       res.json({msg:"access denied "})
    } else {
      console.log("===story===")
      console.log(story)
    res.json({story,user})
    }
  } catch (err) {
    console.log(err)
    
    // res.render('error/404')
    res.json({msg:"internal server error"})
  }
})

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get('/edit/:id', async (req, res) => {
  try {
    // const story = await Story.findOne({
    //   _id: req.params.id,
    // }).lean()
    const story=await Story.findById(req.params.id)

    if (!story) {
      // return res.render('error/404')
      res.json({msg:"no such story"})
    }

    if (story.user != req.user.id) {
      // res.redirect('/stories')
      res.json({msg:"access denied"})

    } else {
      res.json(story)
      
    }
  } catch (err) {
    console.error(err)
    
  }
})

// @desc    Update story
// @route   PUT /stories/:id
router.put('/:id',  async (req, res) => {
  console.log(req.body)
  try {
        const story=await Story.findById(req.params.id)

        if(story){
                story.title=req.body.title ||story.title
                story.body=req.body.body||story.body
                story.status=req.body.status ||story.status  
              
                const updatedUser=await story.save()
                      console.log(updatedUser)
              res.json({msg:"success"})       
        } else{
            res.status(404)
            throw new Error("User not found")
        }
    
} catch (error) {
    console.log(error)
}
})

// @desc    Delete story
// @route   DELETE /stories/:id
router.delete('/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    let story = await Story.findById(req.params.id).lean()

    if (!story) {
      return res.json({msg:"no such story"})
    }
    
    if (story.user != req.user.id) {
      res.json({msg:"access denied"})
    } else {
      await Story.remove({ _id: req.params.id })
      res.json({msg:"you deleted one story"})
      // res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
   res.json(err)
  }
})




module.exports = router
