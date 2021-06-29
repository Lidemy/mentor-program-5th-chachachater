const cursorBeforeArr = []
const siteKey = 'a'
const limit = 5

getComments(siteKey, null, limit)

$('.comment-form').on('submit', (e) => {
  e.preventDefault()
  if ($('input').val() === '' || $('textarea').val() === '') {
    alert('請勿輸入空的暱稱或內容')
    return
  }
  $('.comment-form button').fadeOut(sendComment)
})

$('.load-block button').on('click', (e) => {
  getComments(siteKey, cursorBeforeArr[cursorBeforeArr.length - 1], limit)
})

function getComments(siteKey, cursorBefore, limit) {
  let baseUrl = `http://mentor-program.co/mtr04group3/Selena/week12/hw1/api_comments.php?site_key=${siteKey}&limit=${limit}`
  if (cursorBefore) {
    baseUrl += `&cursor_before=${cursorBefore}`
  }

  $.ajax({
    url: baseUrl
  })
    .done((data) => {
      if (!data.success) {
        alert('Oops... something went wrong, please check your console')
        console.log('fail message: ', data.message)
        return
      }
      data.discussions.forEach((each) => appendCard(each))
      cursorBeforeArr.push(data.cursor_before)
      if (data.pagination_end) { // 當資料全部拿完之後，移除載入更多按鈕
        removeBtn($('.load-block button'))
      }
    })
    .fail((msg) => {
      alert('Oops... something went wrong, please check your console')
      console.log('fail message: ', msg)
    })
}

function appendCard(each) {
  const template = `
    <div class="card mt-3">
      <div class="card-header">
        $nickname
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>$content</p>
          <footer class="blockquote-footer">$created_at</footer>
        </blockquote>
      </div>
    </div>`
  $('.comment-block').append(
    template // escapeHtml 在後端做
      .replace('$nickname', each.nickname)
      .replace('$content', each.content)
      .replace('$created_at', each.created_at)
  )
}

function sendComment() {
  const newComment = {
    site_key: siteKey,
    nickname: $('.comment-form input').val(),
    content: $('.comment-form textarea').val()
  }

  $.ajax({
    method: 'POST',
    url: 'http://mentor-program.co/mtr04group3/Selena/week12/hw1/api_handle_add_comment.php',
    data: newComment
  })
    .done((data) => {
      location.reload()
    })
    .fail((msg) => {
      alert('Oops... something went wrong, please check your console')
      console.log('status code: ', msg.status)
      console.log('fail message: ', msg)
    })
}

function removeBtn(btn) {
  btn.addClass('hide')
}
