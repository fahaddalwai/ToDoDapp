const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList',(accounts)=>{
    before(async()=>{
        this.todoList=await TodoList.deployed()
    })


    it('deployed successfuly',async()=>{
        const address=await this.todoList.address
        assert.notEqual(address,0x0)
        assert.notEqual(address,'')
        assert.notEqual(address,null)
        assert.notEqual(address,undefined)
    })

    
    it('Lists tasks',async()=>{
        const taskCount = await this.todoList.taskCount()
        const task = await this.todoList.tasks(taskCount)
        assert.equal(task.id.toNumber(), taskCount.toNumber())
        assert.equal(task.content, 'Finish Todo List Dapp')
        assert.equal(task.completed, false)
        assert.equal(taskCount.toNumber(), 1)
    })

    it('Create Tasks',async()=>{
        const result=await this.todoList.createTask("My task 1")
        const taskCount=await this.todoList.taskCount()
        assert.equal(taskCount,2)
        console.log(result)
        const event=result.logs[0].args
        assert.equal(event.id.toNumber(),2)

    })

    it("Toggle task completed",async()=>{
        const result=await this.todoList.toggleCompleted(1)
        const task = await this.todoList.tasks(1)
        assert.equal(task.completed, true)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)
        
    })
    
})